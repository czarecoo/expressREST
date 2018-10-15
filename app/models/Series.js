var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeriesSchema = new Schema({
	name: String,
	author: String,
	year: Number,
	tag: String,
});

module.exports = mongoose.model('Series', SeriesSchema);