const request = require('request');
const config = require('./config.json');

exports.get = function(url, data, callback) {

  var options = {
    url: config.url + url,
    method: 'GET',
    headers: {
      'Authorization': config.token,
    },
    json: true,
    body: data
  }

  request(options, function(error, data, response) {
    callback(data.body, error);
  });

}

exports.post = function(url, data, callback) {

  var options = {
    url: config.url + url,
    method: 'POST',
    headers: {
      'Authorization': config.token,
    },
    json: true,
    body: data
  }

  request(options, function(error, data, response) {
    callback(data.body, error);
  });

}

exports.put = function(url, data, callback) {

  var options = {
    url: config.url + url,
    method: 'PUT',
    headers: {
      'Authorization': config.token,
    },
    json: true,
    body: data
  }

  request(options, function(error, data, response) {
    callback(data.body, error);
  });

}
