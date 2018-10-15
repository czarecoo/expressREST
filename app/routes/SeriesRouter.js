var express = require('express');
const SeriesRouter = express.Router();
var SeriesFunctions = require('../functions/SeriesFunctions');

SeriesRouter.use(function (req, res, next) {
	console.log("/Series Request");
	next();
});

SeriesRouter.route('/')
	.get((req, res) => SeriesFunctions.get(req, res))
	.post((req, res) => SeriesFunctions.post(req, res));

SeriesRouter.route('/:seriesId')
	.get((req, res) => SeriesFunctions.putOne(req, res))
	.put((req, res) => SeriesFunctions.getOne(req, res))
	.delete((req, res) => SeriesFunctions.deleteOne(req, res));

module.exports = SeriesRouter;