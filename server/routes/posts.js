const express = require('express');
const routes = express.Router({ caseSensitive: true });
const postController = require('../controller/post')


// Post routes
routes.post('/', postController.createPost);
routes.get('/', postController.getAllPosts);
routes.get('/paginated', postController.getPosts);
routes.get('/:id', postController.getPostById);
routes.put('/:id', postController.updatePost);
routes.delete('/:id', postController.deletePost);

// Comment routes
routes.post('/comments', postController.createComment);
routes.get('/comments/:postId', postController.getCommentsByPostId);
// routes.get('/comments/:id', postController.getCommentById);
routes.put('/comments/:id', postController.updateComment);
routes.delete('/comments/:id', postController.deleteComment);

module.exports = routes
