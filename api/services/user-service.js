'use strict';

var User = require('../models/user');

class UserService {

	* find(email) {
		return yield User.findOne({ 'email': email }, 'name email picture').exec();
	}

	* register(user) {
		var name;
		if (user.displayName) {
			name = user.displayName;
		} else name = user.name.givenName;

		var picture;
		if (user.photos && user.photos.length > 0) {
			picture = user.photos[0].value;
		}

		var userDoc = User({
			name: name,
			picture: picture,
			email: user.email
		});

		return yield userDoc.save();
	}
}

module.exports = new UserService();
