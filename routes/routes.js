
var ctrl = require("../controllers/masterCtrl.js");
const config = require("../config.json");

module.exports = function(app) {

  app.route(config.prefix + '/show').get(ctrl.getShows);

  app.route(config.prefix + '/performance').get(ctrl.getShows);

};
