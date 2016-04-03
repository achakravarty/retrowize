const Router = require('koa-router');
const router = new Router();
const views = require('koa-views');

const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');
const boardController = require('./controllers/board-controller');

const secure = function* (next) {
	if (this.isAuthenticated && this.isAuthenticated()) {
		yield next;
	} else {
		this.status = 401;
		this.response.redirect('/index.html');
	}
};

const boardRoutes = new Router();
boardRoutes.post('/', boardController.createBoard);
boardRoutes.get('/:boardId', boardController.getBoard);
boardRoutes.post('/:boardId/lanes', boardController.addLane);
boardRoutes.delete('/:boardId/lanes/:laneId', boardController.deleteLane);
boardRoutes.post('/:boardId/lanes/:laneId/cards', boardController.addCard);
boardRoutes.delete('/:boardId/lanes/:laneId/cards/:cardId', boardController.deleteCard);
boardRoutes.put('/:boardId/lanes/:laneId/cards/:cardId/vote', boardController.voteCard);

const authRoutes = new Router();
authRoutes.get('/login', authController.authenticate);
authRoutes.get('/login/callback', authController.handleAuthCallback);
authRoutes.get('/login/error', authController.failure);

router.get('/api/user', secure, userController.getUser);

router.get('/index.html', function* (next) {
	if (this.isAuthenticated && this.isAuthenticated()) {
		this.response.redirect('/board');
	}else{
		yield next;
	}
});

router.get('/', secure, function* (next) {
	this.response.redirect('/board');
});

router.get('/board', secure, function*(next){
	yield this.render('main.html');
});

router.use('/api/boards', secure, boardRoutes.routes(), boardRoutes.allowedMethods());
router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());

module.exports = router;
