const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbPath = 'mongodb://localhost:27017/TodoApp';
mongoose.connect(dbPath);

module.exports = {mongoose};
