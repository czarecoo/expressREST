var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Movies = require('./app/models/Movies');
var Series = require('./app/models/Series');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-j4ldp.mongodb.net:27017,cluster0-shard-00-01-j4ldp.mongodb.net:27017,cluster0-shard-00-02-j4ldp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function (req, res, next) {
	console.log(req.body);
	next();
});

router.get('/', function (req, res) {
	res.json({ message: 'Welcome to our api!' });
});

router.route('/movies')
	.post(function (req, res) {

		var movie = new Movies();
		movie.name = req.body.name;
		movie.author = req.body.author;
		movie.year = req.body.year;
		movie.tag = req.body.tag;

		movie.save(function (err) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Movie created!' });
		});


	})
	.get(function (req, res) {
		Movies.find(function (err, movies) {
			if (err) {
				res.send(err);
			}

			res.json(movies);
		});
	});

router.route('/movies/:movieId')
	.get(function (req, res) {
		Movies.findById(req.params.movieId, function (err, movie) {
			if (err) {
				res.send(err);
			}
			res.json(movie);
		});
	})
	.put(function (req, res) {
		Movies.findById(req.params.movieId, function (err, movie) {

			if (err) {
				res.send(err);
			}

			movie.name = req.body.name;
			movie.author = req.body.author;
			movie.year = req.body.year;
			movie.tag = req.body.tag;

			movie.save(function (err) {
				if (err) {
					res.send(err);
				}

				res.json({ message: 'Movie updated!' });
			});

		});
	})
	.delete(function (req, res) {
		Movies.deleteOne({
			_id: req.params.movieId
		}, function (err, movie) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Successfully deleted' });
		});
	});

app.use('/', router);

app.listen(port);
console.log('Server is working on port: ' + port);
