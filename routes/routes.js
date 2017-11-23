module.exports = function(app) {

  show = require("../controllers/show.js");
  // todoList Routes
  app.route('/api/show').get(show.getShows);


};
