const express = require('express');
const routes = express.Router({ caseSensitive: true });

const authenticationController = require('../controller/authentication_controller.js');

// Existing routes
routes.post('/signup', authenticationController.signup);
routes.post('/login', authenticationController.login);

// Google OAuth routes
routes.get('/google', authenticationController.authGoogle);
routes.get('/google/callback', 
    authenticationController.authGoogleCallback, 
    authenticationController.handleRedirect
);
// Profile route
routes.get('/profile', authenticationController.getProfile);

module.exports = routes;
