var ctrl = require("../controllers/masterCtrl.js");

module.exports = function(app) {

	app.route('/shows').get(ctrl.getShows);

	app.route('/shows/:id').get(ctrl.getShow);

	app.route('/shows/:id/categories').get(ctrl.getCategories);

	app.route('/shows/:id/performances').get(ctrl.getPerformances);

	app.route('/performances/:id').get(ctrl.getPerformance);

	app.route('/shows/:id/rates').get(ctrl.getRates);

	app.route('/order/:id').get(ctrl.getOrder);

	app.route('/order/create').get(ctrl.createOrder);

	app.route('/order/:id/tickets').get(ctrl.getTicket).post(ctrl.postTicket);

	app.route('/order/:id/tickets/:ticket').delete(ctrl.removeTicket);

	app.route('/order/:id/pay/swish').post(ctrl.payOrderWithSwish);

	app.route('/order/:id/pay/bambora').post(ctrl.payOrderWithBambora);

};
