const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    // comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image:{type:String},
    postType:{type:String,default:'post'},
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],


}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post
