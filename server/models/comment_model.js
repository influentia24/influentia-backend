const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type:{type:String,default:'comment'}
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment
