const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbPath = process.env.MONGODB_URI;
mongoose.connect( dbPath);

module.exports = {mongoose};
