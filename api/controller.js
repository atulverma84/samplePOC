'use strict';
var fs = require('fs');

var sp_options = {
    entity_id: "https://ifac-digital-standards-pub.web.app/",
    private_key: fs.readFileSync("key-file.pem").toString(),
    certificate: fs.readFileSync("cert-file.crt").toString(),
    assert_endpoint: "https://ifac-digital-standards-pub.web.app/",

}

var login_options = {
    relay_state :"",
    force_authn: true,
    sign_get_request : true
}

var saml2 = require('saml2-js');
const { stringify } = require('querystring');
var idp_options = {
    sso_login_url: "https://members.ifac.org/imis0/SAML/Idp.aspx",
    sso_logout_url: "https://members.ifac.org/imis0/SAML/Idp.aspx",
    certificates: [fs.readFileSync("cert-file.crt").toString()],
    force_authn: true,
    sign_get_request: false,
    allow_unencrypted_assertion: false  
  };
  var idp = new saml2.IdentityProvider(idp_options);
  var sp = new saml2.ServiceProvider(sp_options);
  var controllers = {
   login: function(req, res) {
          

           var metadata = sp.create_metadata();            
          
             var s =   sp.create_login_request_url(idp,sp_options, (error, login_url, request_id) => {
              
                res.json({       
                    error : error,
                    login_url : login_url,
                    request_id : request_id
                });
                // if (error != null)
                //     return res.send(500);
                // res.redirect(login_url);
            })

            

            
   },
   redirect: function(req, res) {
  

    var options = {
        request_body : fs.readFileSync("samlResponse.xml"),
        require_session_index : true
    }
   
    sp.redirect_assert(idp, options, (error, response) => {

        console.log(response);
              
        res.json({       
            error : error,
            response : response
        });
        // if (error != null)
        //     return res.send(500);
        // res.redirect(login_url);
    })
},
abc: function(req, res) {
  

    var options = {
        request_body : fs.readFileSync("samlResponse.xml")
    }
   
    sp.post_assert(idp, options, (error, response) => {
              
        res.json({       
            error : error,
            response : response
        });
        // if (error != null)
        //     return res.send(500);
        // res.redirect(login_url);
    })
},
logout: function(req, res) {
    var options = {
        name_id: "389879",
        session_index: "session123"
      };
     
      sp.create_logout_request_url(idp, options, function(err, logout_url) {
     
        //res.redirect(logout_url);
        res.json({       
            error : err,
            logout_url : logout_url
        });
      });

       },
};

module.exports = controllers;