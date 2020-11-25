'use strict';

const controller = require('./controller');

module.exports = function(app) {
   app.route('/login')
       .get(controller.login);
//    app.route('/distance/:zipcode1/:zipcode2')
//        .get(controller.getDistance);
};