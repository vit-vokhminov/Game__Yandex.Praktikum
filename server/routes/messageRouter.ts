import express from 'express';
import {
    getMessages,
    addMessage,
    getMessageToMessage,
    addMessageToMessage,
} from '../controllers/messageController';

const router = express.Router();

// Получить все комментарии поста
router.get('/messages/:id', getMessages);
// Добавить комментарий
router.post('/message/:id', addMessage);
// Получить все ответы на комментарий
router.get('/answers/:postId/:messageId', getMessageToMessage);
// Добавить комментарий
router.post('/answer/:id', addMessageToMessage);

export default router;
