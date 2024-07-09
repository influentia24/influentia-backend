
const express = require('express');
const routes = express.Router({ caseSensitive: true });
const testimonialController = require('../controller/testimonials')


// Post routes
routes.post('/', testimonialController.createTestimonial);
routes.get('/', testimonialController.getTestimonial);


module.exports = routes
