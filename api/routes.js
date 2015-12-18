var Router = require('koa-router')
var router = new Router();
var authController = require('./controllers/auth-controller');
var userController = require('./controllers/user-controller');
var boardController = require('./controllers/board-controller');

var secure = function* (next) {
	if (this.isAuthenticated && this.isAuthenticated()) {
		yield next;
	} else {
		this.redirect('/index.html');
	}
}

var boardRoutes = new Router();
boardRoutes.post('/', boardController.createBoard);
boardRoutes.get('/:boardId', boardController.getBoard);
boardRoutes.post('/:boardId/lanes', boardController.addLane);
boardRoutes.delete('/:boardId/lanes/:laneId', boardController.deleteLane);
boardRoutes.post('/:boardId/lanes/:laneId/cards', boardController.addCard);
boardRoutes.delete('/:boardId/lanes/:laneId/cards/:cardId', boardController.deleteCard);
boardRoutes.put('/:boardId/lanes/:laneId/cards/:cardId/vote', boardController.voteCard);

var authRoutes = new Router();
authRoutes.get('/login', authController.authenticate);
authRoutes.get('/login/callback', authController.handleAuthCallback);
authRoutes.get('/login/error', authController.failure);

router.get('/api/user', secure, userController.getUser);

router.get('/',secure, function* (next) {
	this.response.redirect('/main.html');
})

router.use('/api/boards', secure, boardRoutes.routes(), boardRoutes.allowedMethods());
router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());

module.exports = router;
