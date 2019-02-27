var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoDBPath = process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017/TodoApp";
mongoose.connect(mongoDBPath, { useNewUrlParser: true });

module.exports = {mongoose};
