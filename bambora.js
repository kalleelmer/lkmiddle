var request = require('request')

exports.pay = function(amount, id, customer, callback, url) {

	var data = {
		"order": {
			"id": id,
			"amount": amount,
			"currency": "SEK",
		},
		"url": {
			"accept": url + "/accept",
			"immediateredirecttoaccept":1,
			"cancel": url + "/cancel",
			"callbacks": [{
				"url": url + "/callback"
			}],
		},
		"instantcaptureamount" : amount,
		"customer" : customer
	}

	console.log("Bambora: ");
	console.log(JSON.stringify(data));
	console.log();

	var options = {
		url: 'https://api.v1.checkout.bambora.com/sessions',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + process.env.BAMBORA_TOKEN,
		},
		json: true,
		body: data,
	}

	request(options, function(error, response, data) {
		if (error) {
			console.log(error);
		} else {
			console.log(response.body);
			callback(response)
		}
	});

}
