'use strict';
var fs = require('fs');
// var properties = require('../package.json')
// var distance = require('../service/distance');

var sp_options = {
    entity_id: "https://members.ifac.org/imis0/staff",
    private_key: fs.readFileSync("key-file.pem").toString(),
    certificate: fs.readFileSync("cert-file.crt").toString(),
    assert_endpoint: "http://localhost:3000/",
    // force_authn: true,
    // auth_context: { comparison: "exact", class_refs: ["urn:oasis:names:tc:SAML:1.0:am:password"] },
    // nameid_format: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
    // sign_get_request: false,
    // allow_unencrypted_assertion: true
}

var login_options = {
    relay_state :"",
    force_authn: true,
    sign_get_request : true
}

var saml2 = require('saml2-js');
var idp_options = {
    sso_login_url: "https://members.ifac.org/imis0/SAML/Idp.aspx",
    sso_logout_url: "https://members.ifac.org/imis0/SAML/Idp.aspx",
    certificates: fs.readFileSync("cert-file1.crt").toString()  
  };
  var idp = new saml2.IdentityProvider(idp_options);
var controllers = {
   login: function(req, res) {
    //    var aboutInfo = {
    //        userid: properties.name,
    //        version: properties.version
    //    }
    //    res.json(aboutInfo);
    
          

            var sp = new saml2.ServiceProvider(sp_options);

            // Example use of service provider.
            // Call metadata to get XML metatadata used in configuration.
            var metadata = sp.create_metadata();
            
            console.log(idp);
         var s =   sp.create_login_request_url(idp,sp_options, () => {
                //console.log(s);
                res.json({                    
                    metadata : metadata
                });
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