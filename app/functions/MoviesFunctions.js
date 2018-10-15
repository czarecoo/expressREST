var Movies = require('../models/Movies');

class MoviesFunctions {
	static get(req, res) {
		Movies.find(function (err, movies) {
			if (err) {
				res.send(err);
			}

			res.json(movies);
		});
	}

	static post(req, res) {
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
	}

	static putOne(req, res) {
		Movies.findById(req.params.movieId, function (err, movie) {
			if (err) {
				res.send(err);
			}
			res.json(movie);
		});
	}

	static getOne(req, res) {
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
	}

	static deleteOne(req, res) {
		Movies.deleteOne({
			_id: req.params.movieId
		}, function (err, movie) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Movie successfully deleted' });
		});
	}
}

module.exports = MoviesFunctions;