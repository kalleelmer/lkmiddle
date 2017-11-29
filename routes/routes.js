
var show = require("../controllers/show.js");
const config = require("../config.json");

module.exports = function(app) {

  app.route(config.prefix + '/show').get(show.getShows);

};
