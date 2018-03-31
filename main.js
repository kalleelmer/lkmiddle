const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var routes = require('./routes/routes.js');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	next();
});

routes(app);
app.listen(8081, () => console.log('Listening on port 8081'))
