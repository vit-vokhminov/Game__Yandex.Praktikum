const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const messageRouter = require('./messageRouter');
const leaders = require('./leaders');

router.use(userRouter);
router.use(postRouter);
router.use(messageRouter);
router.use(leaders);

module.exports = router;
