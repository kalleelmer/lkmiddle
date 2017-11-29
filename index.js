const express = require('express')
const app = express()
var api = require('./api.js')

var routes = require('./routes/routes.js');

routes(app);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

api.get("/admin/shows", {}, function(response, error) {
  console.log(response);
});
