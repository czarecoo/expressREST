var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MoviesRouter = require('./app/routes/MoviesRouter');
var SeriesRouter = require('./app/routes/SeriesRouter');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-j4ldp.mongodb.net:27017,cluster0-shard-00-01-j4ldp.mongodb.net:27017,cluster0-shard-00-02-j4ldp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var MainRouter = express.Router();

MainRouter.use(function (req, res, next) {
	next();
}).get('/', function (req, res) {
	res.json({ message: 'Welcome to our api!' });
});

app.use('/', MainRouter);
app.use('/Movies', MoviesRouter);
app.use('/Series', SeriesRouter);

app.listen(port);
console.log('Server is working on port: ' + port);
