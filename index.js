const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var routes = require('./routes/routes.js');

console.log(process.env.PREFIX);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app);
app.listen(3000, () => console.log('Listening on port 3000!'))
