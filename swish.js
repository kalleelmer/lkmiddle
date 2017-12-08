var fs = require('fs'), path = require('path'), pfxFilePath = path.resolve(
	__dirname, './Testcertifikat/PKCS12/1231181189.p12'), request = require('request');

exports.pay = function(amount, orderid, payerAlias, callback) {

	var data = {
		payeePaymentReference : orderid,
		callbackUrl : process.env.SWISH_CALLBACK,
		payerAlias : payerAlias,
		payeeAlias : process.env.SWISH_NUMBER,
		amount : amount,
		currency : "SEK",
		message : process.env.SWISH_MESSAGE
	}

	var options = {
		url : 'HTTPS://mss.swicpc.bankgirot.se/swish-cpcapi/api/v1/paymentrequests/',
		agentOptions : {
			pfx : fs.readFileSync(pfxFilePath),
			passphrase : process.env.SWISH_PASSWORD
		},
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		json : true,
		body : data,
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

exports.getPaymentInfo = function(id, callback) {

	var options = {
		url : id,
		agentOptions : {
			// Or use `pfx` property replacing `cert` and `key` when using
			// private key, certificate and CA certs in PFX or PKCS12 format:
			pfx : fs.readFileSync(pfxFilePath),
			passphrase : 'swish'
		},
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json'
		}
	}
	request(options, function(error, response, data) {
		if (error) {
			console.log(error);
		} else {
			callback(response)
		}
	});

}
