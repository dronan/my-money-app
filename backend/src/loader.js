const server = require('./config/server')
require('./config/database')
// use server as parameter in routes.js
require('./config/routes')(server)