const config = require('config');
const koa = require('koa');
const session = require('koa-session');
const passport = require('koa-passport');
const bodyParser = require('koa-body');
const views = require('koa-views');
const io = require('./io');
const db = require('./db');
const router = require('./routes');

const app = koa();
io.init(app);

db.connect();

var auth = require('./auth');
auth.init();

app.keys = ['Application Secret - change me!!'];

app.use(views(__dirname + '/views', {
  map: {
    html: 'handlebars'
  }
}));

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

app.server.listen(process.env.PORT || 3000);
