
const PostModel = require('../models/post_model');
const CommentModel = require('../models/comment_model');

module.exports.createPost = async (postData) => {
    return await PostModel.create(postData);
}

module.exports.getAllPosts = async () => {
    try {
        return await PostModel.find()
            .populate('userId', 'name email') // Populate user data, selecting name and email fields
            .populate('portfolioId', 'title description image'); // Populate portfolio data, selecting title, description, and image fields
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
module.exports.getPosts = async (currentPage, perPage, userId) => {
    let query = {};
    if (userId) {
        query.userId = userId;
    }
    return await PostModel.find(query).skip((currentPage - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
}

module.exports.getPostsCount = async (userId) => {
    let query = {};
    if (userId) {
        query.userId = userId;
    }
    return await PostModel.countDocuments(query);
}

module.exports.getPostById = async (id) => {
    return await PostModel.findById(id);
}

module.exports.updatePost = async (id, postData) => {
    return await PostModel.findByIdAndUpdate(id, postData, { new: true });
}

module.exports.deletePost = async (id) => {
    return await PostModel.findByIdAndDelete(id);
}

module.exports.createComment = async (commentData) => {
    return await CommentModel.create(commentData);
}

module.exports.getCommentsByPostId = async (postId) => {
    return await CommentModel.find({ postId });
}

module.exports.getCommentById = async (id) => {
    return await CommentModel.findById(id);
}

module.exports.updateComment = async (id, commentData) => {
    return await CommentModel.findByIdAndUpdate(id, commentData, { new: true });
}

module.exports.deleteComment = async (id) => {
    return await CommentModel.findByIdAndDelete(id);
}
