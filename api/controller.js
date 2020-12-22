'use strict';
var fs = require('fs');

var sp_options = {
    entity_id: "https://members.ifac.org/imis0",
    private_key: fs.readFileSync("key-file.pem").toString(),
    certificate: fs.readFileSync("cert-file.crt").toString(),
    assert_endpoint: "http://gmail.com",

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
    certificates: [fs.readFileSync("cert-file.crt").toString()]  
  };
  var idp = new saml2.IdentityProvider(idp_options);
  var controllers = {
   login: function(req, res) {
           var sp = new saml2.ServiceProvider(sp_options);

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
   logout: function(req, res) {
           distance.find(req, res, function(err, dist) {
               if (err)
                   res.send(err);
               res.json(dist);
           });
       },
};

module.exports = controllers;