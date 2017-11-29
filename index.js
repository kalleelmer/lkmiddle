const express = require('express')
const app = express()

var routes = require('./routes/routes.js');

routes(app);

app.listen(3000, () => console.log('Listening on port 3000!'))
