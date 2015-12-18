'use strict'
var passport = require('koa-passport');

class AuthController {

	* authenticate(next) {
		yield passport.authenticate('google', {
			scope: [
				'https://www.googleapis.com/auth/plus.login',
				'https://www.googleapis.com/auth/userinfo.email'
			]
		});
	}

	* handleAuthCallback(next) {
		yield passport.authenticate('google', {
			successRedirect: 'http://localhost:3000/index.html',
			failureRedirect: 'http://localhost:3000/auth/login/error'
		})
		yield next;
	}

	* failure(next) {
		this.body = 'failed';
	}
}

module.exports = new AuthController();
