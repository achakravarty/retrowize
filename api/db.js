var env = process.env.NODE_ENV;

var mongoose = require('mongoose');
var config = require('config');

var Db = {

	connect: function () {
		var dbUri = config.get('db.uri');
		console.log('Connecting to ' + dbUri)
		this.connection = mongoose.connect(dbUri);
		return this.connection;
	}

};

module.exports = Db;
