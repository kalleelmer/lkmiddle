'use strict';

var api = require('../api.js')
var swish = require('../swish.js')

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
  api.post("/desk/orders/" + req.params.id + "/tickets",  req.body, function(response, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(response);
    }
  });

}

exports.payOrder = function(req, res) {
  swish.pay(function(data) {

    swish.getPaymentInfo(data.headers.location, function(d) {
      res.send(d.body);
    })
  });
}
