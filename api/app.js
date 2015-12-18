var config = require('config');
var koa = require('koa');
var session = require('koa-session');
var passport = require('koa-passport');
var bodyParser = require('koa-body');

var db = require('./db');
var router = require('./routes');

var app = koa();
db.connect();

var auth = require('./auth');
auth.init();

app.keys = ['Application Secret - change me!!'];

app.use(require('koa-file-server')({
  root: 'public'
}));

var requestLogger = function* (next) {
  var start = new Date();
  yield next;
  var duration = new Date() - start;
  console.log(`${this.method} ${this.originalUrl} ${this.status} ${duration}`);
};

app
  .use(bodyParser({ strict: false }))
  .use(session(app))
  .use(passport.initialize())
  .use(passport.session())
  .use(requestLogger)
  .use(router.routes())
  .use(router.allowedMethods());

console.log('Config environment:', config.util.getEnv('NODE_ENV'));

app.listen(3000);
