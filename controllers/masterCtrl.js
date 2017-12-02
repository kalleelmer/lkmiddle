'use strict';

var api = require('../api.js')

exports.getShows = function(req, res) {

  api.get("/desk/shows", {}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });

};

exports.getPerformances = function(req, res){
  api.get("/desk/shows/" + req.params.id + "/performance"),{}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  }
}

exports.getCategories = function(req, res){
  api.get("/desl/shows/" + req.params.id + "/categories", {}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });
}

exports.getRates = function(req, res){
  api.get("/desk/shows/" + req.params.id + "/rates", {}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });
}

exports.createOrder = function(req, res){
  api.get("/desk/orders/create" , {}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });
}

exports.getOrder = function(req, res){
  api.get("/desk/orders/" + req.params.id,  {}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });
}


exports.getTicket = function(req, res){
  api.get("/desk/orders/" + req.params.id + "/tickets",  {}, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });
}

exports.postTicket = function(req, res){
  console.log(req.body);
  api.post("/desk/orders/" + req.params.id + "/tickets",  req.body, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });
}
