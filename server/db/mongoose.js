const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbPath = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.connect( dbPath);

module.exports = {mongoose};
