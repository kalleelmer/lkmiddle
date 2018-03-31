'use strict';

var api = require('../api.js');
var swish = require('../swish.js');
var bambora = require('../bambora.js')
var md5 = require('md5');

exports.getShows = function(req, res) {

	api.get("/desk/shows", {}, function(response, error, status) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});

};

exports.getShow = function(req, res) {
	api.get("/desk/shows/" + req.params.id, {}, function(response, error, status) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.getPerformances = function(req, res) {
	api.get("/desk/shows/" + req.params.id + "/performances", {}, function(
		response, error, status) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.getPerformance = function(req, res) {
	api.get("/desk/performances/" + req.params.id, {}, function(
		response, error, status) {
		if (error) {
			res.send(error)
		} else {
			api.get("/desk/performances/" + req.params.id + "/profiles/" + process.env.PROFILE_ID + "/availability",{}, function(response2, error2, status2) {
				if (error) {
					res.send(error);
				} else {
					response.availability = response2;
					res.send(response);
				}
			});
		}
	});
}



exports.getCategories = function(req, res) {
	api.get("/desk/shows/" + req.params.id + "/categories", {}, function(
		response, error, status) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.getRates = function(req, res) {
	api.get("/desk/shows/" + req.params.id + "/rates", {}, function(response,
		error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.createOrder = function(req, res) {
	api.get("/desk/orders/create", {}, function(response, error, status) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.getOrder = function(req, res) {
	api.get("/desk/orders/" + req.params.id, {}, function(response, error, status) {
		if (error) {
			res.send(error)
		} else {
			if (response.identifier == req.query.identifier) {
				res.send(response);
			} else {
				res.status(401).send("Unauthorized");
			}

		}
	});
}

exports.getTicket = function(req, res) {

	api.get("/desk/orders/" + req.params.id, {}, function(response, error, status) {
		if (error) {
			res.send(error)
		} else {
			if (response.identifier == req.query.identifier) {
				api.get("/desk/orders/" + req.params.id + "/tickets", {}, function(
					response, error, status) {
					if (error) {
						res.send(error)
					} else {
						res.send(response);
					}
				});
			} else {
				res.status(401).send("Unauthorized");
			}

		}
	});
}

exports.postTicket = function(req, res) {
	req.body.profile_id = +process.env.PROFILE_ID;

	api.get("/desk/orders/" + req.params.id, {}, function(response, error, status) {
		if (error) {
			res.send(error)
		} else {
			if (response.identifier == req.query.identifier) {

				api.post("/desk/orders/" + req.params.id + "/tickets?location=test", req.body, function(
					response, error, status) {
					if (error) {
						res.send(error)
					} else {
						res.status(status);
						res.send(response);
					}

				});
			} else {
				res.status(401).send("Unauthorized");
			}

		}
	});

}

exports.removeTicket = function(req, res) {

	api.get("/desk/orders/" + req.params.id, {}, function(response, error, status) {
		if (error) {
			res.send(error)
		} else {
			if (response.identifier == req.query.identifier) {
				api.delete("/desk/orders/" + req.params.id + "/tickets/" + req.params.ticket, {}, function(response, error, status) {
					if (error) {
						res.send(error)
					} else {
						res.send(response);
					}
				});
			} else {
				res.status(401).send("Unauthorized");
			}

		}
	});

}

exports.payOrderWithSwish = function(req, res) {

	if (req.body.amount && req.body.payerAlias) {
		swish.pay(req.body.amount, req.params.id, req.body.payerAlias,
			function(data) {

				swish.getPaymentInfo(data.headers.location, function(d) {
					res.send(d.body);
				})
			});
	} else {
		res.status(400).send("400 Bad request");
	}

}

exports.payOrderWithBambora = function(req, res) {

	api.get("/desk/orders/" + req.params.id + "/tickets", {}, function(
		response, error, status) {
		if (error) {
			res.send(error)
		} else {

			var totalAmount = 0;

			for (var i = 0; i < response.length; i++) {
				totalAmount+= response[i].price;
			}

			console.log(totalAmount);

			if (req.body.amount == totalAmount) {
				bambora.pay(req.body.amount * 100, req.params.id, function(response) {
					res.send(response.body);
				}, "https://" + req.headers.host);
			} else {
				res.status(400).send("400 Bad request");
			}
		}
	});
}

exports.callback = function(req, res) {

	console.log("callback init");
	console.log(req.query);

	var amount = req.query.amount;
	var orderid = req.query.orderid;
	var hash = req.query.hash;
	var callback = process.env.BAMBORA_CALLBACK_TOKEN;

	// TODO: Ev kolla amount mot Core

	if(!amount || !orderid|| !callback){
		res.status(401).send("Unauthorized");
		return;
	}

	var concatenatedValues = "";

	for (var key in req.query) {
		if (key != "hash") {
			concatenatedValues+=req.query[key];
		}
	}

	console.log(concatenatedValues);

	concatenatedValues+=callback;

	if (md5(concatenatedValues) == hash) {
		api.post("/desk/orders/" + orderid + "/payments",
			{method : "cash",
			amount : amount/100,
			reference : "Kristoffer",
			profile_id : +process.env.PROFILE_ID
		}, function(response, error, status) {
			res.status(status).send();
		});
	} else {
		res.status(401).send("Unauthorized");
	}

}

exports.acceptPayment = function(req, res) {
	console.log(req.headers);
	res.redirect("https://web-dev.lkticket.net/#/thanks");
	res.send();
}

exports.cancelPayment = function(req, res) {



}

exports.getPrices = function(req, res) {
	api.get("/desk/categories/" + req.params.id + "/prices", {}, function(
		response, error, status) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}
