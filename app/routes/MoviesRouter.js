var express = require('express');
const MoviesRouter = express.Router();
var MoviesFunctions = require('../functions/MoviesFunctions');

MoviesRouter.use(function (req, res, next) {
	console.log("/Movies Request");
	next();
});

MoviesRouter.route('/')
	.get((req, res) => MoviesFunctions.get(req, res))
	.post((req, res) => MoviesFunctions.post(req, res));

MoviesRouter.route('/:movieId')
	.get((req, res) => MoviesFunctions.putOne(req, res))
	.put((req, res) => MoviesFunctions.getOne(req, res))
	.delete((req, res) => MoviesFunctions.deleteOne(req, res));

module.exports = MoviesRouter;