const express = require('express');
const routes = express.Router({ caseSensitive: true });

const authenticationController = require('../controller/authentication_controller.js');

routes.post('/signup', authenticationController.signup);
routes.post('/login',authenticationController.login );


module.exports = routes