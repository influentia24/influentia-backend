const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } // for nested comments
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment
