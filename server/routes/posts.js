const express = require('express');
const routes = express.Router({ caseSensitive: true });
const postController = require('../controller/post')
const multer = require('multer');
const upload = multer();


// Post routes
routes.post('/',upload.single('file'), postController.createPost);
routes.get('/', postController.getAllPosts);
routes.get('/paginated', postController.getPosts);
routes.get('/:id', postController.getPostById);
routes.put('/:id', postController.updatePost);
routes.delete('/:id', postController.deletePost);
routes.get('/saved', postController.getSavedPosts);


// Comment routes
routes.post('/comments', postController.createComment);
routes.get('/comments/:postId', postController.getCommentsByPostId);
// routes.get('/comments/:id', postController.getCommentById);
routes.put('/comments/:id', postController.updateComment);
routes.delete('/comments/:id', postController.deleteComment);
routes.post('/upload-image',upload.single('file'),postController.uploadImage)

module.exports = routes
