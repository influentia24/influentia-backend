const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    },
    image:{
        type:String
    }

});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
