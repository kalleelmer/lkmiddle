
var ctrl = require("../controllers/masterCtrl.js");
const config = require("../config.json");

module.exports = function(app) {

  app.route(config.prefix + '/shows').get(show.getShows);

  app.route(config.prefix + '/shows/:id/categories').get(show.getCategories);

  app.route(config.prefix + '/shows/:id/performances').get(show.getPerformances);

  app.route(config.prefix + '/shows/:id/rates').get(show.getRates);

};
