const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var routes = require('./routes/routes.js');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

routes(app);
app.listen(3000, () => console.log('Listening on port 3000!'))
