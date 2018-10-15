var Series = require('../models/Series');

class SeriesFunctions {
	static get(req, res) {
		Series.find(function (err, series) {
			if (err) {
				res.send(err);
			}

			res.json(series);
		});
	}

	static post(req, res) {
		var series = new Series();
		series.name = req.body.name;
		series.author = req.body.author;
		series.year = req.body.year;
		series.tag = req.body.tag;
		series.save(function (err) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Series created!' });
		});
	}

	static putOne(req, res) {
		Series.findById(req.params.seriesId, function (err, series) {
			if (err) {
				res.send(err);
			}
			res.json(series);
		});
	}

	static getOne(req, res) {
		Series.findById(req.params.seriesId, function (err, series) {

			if (err) {
				res.send(err);
			}

			series.name = req.body.name;
			series.author = req.body.author;
			series.year = req.body.year;
			series.tag = req.body.tag;

			series.save(function (err) {
				if (err) {
					res.send(err);
				}

				res.json({ message: 'Series info updated!' });
			});

		});
	}

	static deleteOne(req, res) {
		Series.deleteOne({
			_id: req.params.seriesId
		}, function (err, series) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Series successfully deleted' });
		});
	}
}

module.exports = SeriesFunctions;