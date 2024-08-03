
const PostModel = require('../models/post_model');
const CommentModel = require('../models/comment_model');

module.exports.createPost = async (postData) => {
    return await PostModel.create(postData);
}
module.exports.getAllPosts = async (currentPage = 1, perPage = 10, role) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            }
        ];

        if (role) {
            pipeline.push({
                $match: { 'user.role': role }
            });
        }

        const totalPipeline = [...pipeline, { $count: 'total' }];
        
        const postsPipeline = [
            ...pipeline,
            { $skip: (currentPage - 1) * perPage },
            { $limit: perPage },
            {
                $project: {
                    title: 1,
                    desc: 1,
                    comments: 1,
                    userId: 1,
                    role: 1,
                    image: 1,
                    postType: 1,
                    likes: 1,
                    likedBy: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'user.firstName': 1,
                    'user.lastName': 1,
                    'user.email': 1,
                    'user.role': 1,
                    'user.portfolio': 1
                }
            },
            {
                $lookup: {
                    from: 'portfolios',
                    localField: 'user.portfolio',
                    foreignField: '_id',
                    as: 'user.portfolio'
                }
            },
            {
                $unwind: {
                    path: '$user.portfolio',
                    preserveNullAndEmptyArrays: true
                }
            }
        ];

        const [posts, totalResult] = await Promise.all([
            PostModel.aggregate(postsPipeline),
            PostModel.aggregate(totalPipeline)
        ]);

        const totalPosts = totalResult.length > 0 ? totalResult[0].total : 0;

        return {
            posts,
            totalPosts,
            totalPages: Math.ceil(totalPosts / perPage),
            currentPage
        };
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
