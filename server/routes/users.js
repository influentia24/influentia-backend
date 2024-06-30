const express = require('express');
const routes = express.Router({ caseSensitive: true });

const UserController = require('../controller/user.js');

routes.get('/', UserController.getUsers);
routes.post('/', UserController.createUser);
routes.get('/:username', UserController.getUser);
routes.put('/', UserController.updateUser);
routes.delete('/', UserController.deleteUser);
routes.post('/portfolio', UserController.addPortFolioForUser);
routes.get('/portfolio/:username', UserController.getPortfolioByUserName);
routes.post('/portfolio', UserController.createPortfolio);
routes.get('/portfolios', UserController.getAllPortfolios);
routes.get('/portfolios/:niche', UserController.getPortfolios);
routes.get('/portfolio/:id', UserController.getPortfolioById);
routes.put('/portfolio/:id', UserController.updatePortfolio);
routes.delete('/portfolio/:id', UserController.deletePortfolio);

module.exports = routes
