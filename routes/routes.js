
show = require("../controllers/show.js");

module.exports = function(app) {

  app.route('/api/show').get(show.getShows);

};
