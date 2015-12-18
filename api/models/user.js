var mongoose = require('mongoose');

var userSchema = {
	name: String,
	picture: String,
	email: { type: String, index: true }
}

module.exports = mongoose.model('User', userSchema);
