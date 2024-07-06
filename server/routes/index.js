const express = require('express');
const routes = express.Router({ caseSensitive: true });

routes.use('/auth',require('./authentication_route.js'));
routes.use('/users',require('./users.js'));
routes.use('/posts',require('./posts.js'))

module.exports =routes;