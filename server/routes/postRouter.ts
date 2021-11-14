import express from 'express';
import {
    getPosts,
    addPost,
    getPost,
    deletePost,
    editPost,
} from '../controllers/postController';

const router = express.Router();

// Получить все посты
router.get('/posts', getPosts);
// Создать новый пост
router.post('/post', addPost);
// Получить пост по id
router.get('/post/:id', getPost);
// Изменить пост по id
router.put('/post/:id', editPost);
// Удалить пост по id
router.delete('/post/:id', deletePost);

export default router;
