const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbPath = process.env.MONODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.connect( dbPath);

module.exports = {mongoose};
