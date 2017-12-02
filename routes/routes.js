
var ctrl = require("../controllers/masterCtrl.js");
const config = require("../config.json");

module.exports = function(app) {

  app.route(config.prefix + '/shows').get(ctrl.getShows);

  app.route(config.prefix + '/shows/:id/categories').get(ctrl.getCategories);

  app.route(config.prefix + '/shows/:id/performances').get(ctrl.getPerformances);

  app.route(config.prefix + '/shows/:id/rates').get(ctrl.getRates);

  app.route(config.prefix + '/order/:id').get(ctrl.getOrder);

  app.route(config.prefix + '/order/create').get(ctrl.createOrder);

  app.route(config.prefix + '/order/:id/tickets').get(ctrl.getTicket).post(ctrl.postTicket);

  app.route(config.prefix + '/order/:id/pay').get(ctrl.payOrder);

};
