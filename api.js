const request = require('request');

exports.get = function(url, data, callback) {

	var options = {
		url : process.env.API_URL + url,
		method : 'GET',
		headers : {
			'Authorization' : process.env.API_TOKEN,
		},
		json : true,
		body : data
	}

	console.log("Get request to: " + options.url);
	console.log("Data: " + JSON.stringify(options.body));

	request(options, function(error, data, response) {
		callback(data.body, error);
	});

}

exports.post = function(url, data, callback) {

	var options = {
		url : process.env.API_URL + url,
		method : 'POST',
		headers : {
			'Authorization' : process.env.API_TOKEN,
		},
		json : true,
		body : data
	}

	console.log("Post request to: " + options.url);
	console.log("Data: " + options.body);

	request(options, function(error, data, response) {
		callback(data.body, error);
	});

}

exports.put = function(url, data, callback) {

	var options = {
		url : process.env.API_URL + url,
		method : 'PUT',
		headers : {
			'Authorization' : process.env.API_TOKEN,
		},
		json : true,
		body : data
	}

	console.log("Put request to: " + options.url);
	console.log("Data: " + options.body);

	request(options, function(error, data, response) {
		callback(data.body, error);
	});

}
