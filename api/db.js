var env = process.env.NODE_ENV;

var mongoose = require('mongoose');
var config = require('config');

var Db = {

	connect: function () {
		console.log('Using environment:', env);

		console.log('Configuration environment:', config.util.getEnv('NODE_ENV'));
		var host = config.get('db.host');
		var port = config.get('db.port');
		var database = config.get('db.database');
		console.log('Connecting to databases', database);

		this.connection = mongoose.connect(`mongodb://${host}:${port}/${database}`);
		return this.connection;
	}

};

module.exports = Db;
