'use strict';

var api = require('../api.js')

exports.getShows = function(req, res) {

  api.get("/admin/shows", {}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });

};
