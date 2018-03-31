const request = require('request');

exports.get = function(url, data, callback) {

	var options = {
		url : process.env.API_URL + url,
		method : 'GET',
		headers : {
			'Authorization' : "Token " + process.env.API_TOKEN,
		},
		json : true,
		body : data
	}

	console.log("Get request to: " + options.url);
	console.log("Data: ");
	console.log(data);

	request(options, function(error, data, response) {
		callback(data.body, error, data.statusCode);
	});

}

exports.post = function(url, data, callback) {

	var options = {
		url : process.env.API_URL + url,
		method : 'POST',
		headers : {
			'Authorization' : "Token " + process.env.API_TOKEN,
		},
		json : true,
		body : data
	}

	console.log("Post request to: " + options.url);

	request(options, function(error, data, response) {
		callback(data.body, error, data.statusCode);
	});

}

exports.put = function(url, data, callback) {

	var options = {
		url : process.env.API_URL + url,
		method : 'PUT',
		headers : {
			'Authorization' : "Token " + process.env.API_TOKEN,
		},
		json : true,
		body : data
	}

	console.log("Put request to: " + options.url);
	console.log("Data: " + options.body);

	request(options, function(error, data, response) {
		callback(data.body, error, data.statusCode);
	});

}

exports.deleet = function(url, data, callback) {

	var options = {
		url : process.env.API_URL + url,
		method : 'DELETE',
		headers : {
			'Authorization' : "Token " + process.env.API_TOKEN,
		},
		json : true,
		body : data
	}

	console.log("Delete request to: " + options.url);
	console.log("Data: " + options.body);

	request(options, function(error, data, response) {
		callback(data.body, error, data.statusCode);
	});

}
