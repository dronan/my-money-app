const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://localhost/mymoney')

mongoose.Error.messages.general.required = "The attribute '{PATH}' is required."