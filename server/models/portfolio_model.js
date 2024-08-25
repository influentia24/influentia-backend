const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    title: { type: String },
    url: { type: String },
});

const portfolioSchema = new mongoose.Schema({
    title: { type: String },
    bio: { type: String},
    image: { type: String },
    banner:{ type:String },
    niche: { type: String },
    link: [LinkSchema],
    category: { type: String },
    username: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Portfolio = mongoose.model('portfolio', portfolioSchema);

module.exports = Portfolio;