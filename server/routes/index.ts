import express from 'express';
import postRouter from './postRouter';
import messageRouter from './messageRouter';

const router = express.Router();

router.use(postRouter);
router.use(messageRouter);

export default router;
