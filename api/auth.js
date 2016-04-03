var config = require('config');
var passport = require('koa-passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var co = require('co');

var userService = require('./services/user-service');

var Auth = {
  init: function () {

    passport.serializeUser(function (user, done) {
      done(null, user.email);
    });

    passport.deserializeUser(function (email, done) {
      co(function* () {
        var existingUser = userService.find(email);
        return yield existingUser;
      }).then(function (user) {
        done(null, user);
      }, function (err) {
        console.error(err);
        done(err, null);
      });
    });

    passport.use(new GoogleStrategy({
      clientID: config.get('google.clientID'),
      clientSecret: config.get('google.clientSecret'),
      callbackURL: config.get('google.callbackURL'),
      passReqToCallback: true
    }, function (request, accessToken, refreshToken, profile, done) {
      co(function* () {
        var user = yield userService.find(profile.email);
        if (!user) {
          user = yield userService.register(profile);
        }
        return user;
      }).then(function (value) {
        done(null, value);
      }, function (err) {
        console.error(err);
        done(err, null);
      });
    }));
  }
};

module.exports = Auth;
