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

exports.getPerformances = function(req, res){
  api.get("/admin/shows/" + req.params.id + "/performance"),{}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  }
}

exports.getCategories = function(req, res){
  api.get("/admin/shows/" + req.params.id + "/categories", {}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });
}

exports.getRates = function(req, res){
  api.get("/admin/shows/" + req.params.id + "/rates", {}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });
}
