'use strict'
var passport = require('koa-passport');
var config = require('config');

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
			successRedirect: config.get("hostURL") + '/main.html',
			failureRedirect: config.get("hostURL") + '/auth/login/error'
		})
		yield next;
	}

	* failure(next) {
		this.body = 'failed';
	}
}

module.exports = new AuthController();
