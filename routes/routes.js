var ctrl = require("../controllers/masterCtrl.js");

module.exports = function(app) {

	app.route(process.env.PREFIX + '/shows').get(ctrl.getShows);

	app.route(process.env.PREFIX + '/shows/:id/categories').get(
		ctrl.getCategories);

	app.route(process.env.PREFIX + '/shows/:id/performances').get(
		ctrl.getPerformances);

	app.route(process.env.PREFIX + '/shows/:id/rates').get(ctrl.getRates);

	app.route(process.env.PREFIX + '/order/:id').get(ctrl.getOrder);

	app.route(process.env.PREFIX + '/order/create').get(ctrl.createOrder);

	app.route(process.env.PREFIX + '/order/:id/tickets').get(ctrl.getTicket)
		.post(ctrl.postTicket);

	app.route(process.env.PREFIX + '/order/:id/pay/swish').post(
		ctrl.payOrderWithSwish);

	app.route(process.env.PREFIX + '/order/:id/pay/bambora').post(
		ctrl.payOrderWithBambora);

};
