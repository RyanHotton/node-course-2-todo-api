var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoDBPath = process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017/TodoApp";
mongoose.connect(mongoDBPath, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {mongoose};
