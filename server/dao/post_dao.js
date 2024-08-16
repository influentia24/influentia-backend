
const PostModel = require('../models/post_model');
const CommentModel = require('../models/comment_model');

module.exports.createPost = async (postData) => {
    return await PostModel.create(postData);
}
module.exports.getAllPosts = async (currentPage = 1, perPage = 10, role, postType, status, sortBy) => {
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
        if (postType) {
            pipeline.push({
                $match: { 'postType': postType }
            })
        }
        if (status) {
            pipeline.push({
                $match: { 'status': status }
            })
        }

        const totalPipeline = [...pipeline, { $count: 'total' }];

        const postsPipeline = [
            ...pipeline,
            { $skip: (currentPage - 1) * perPage },
            { $limit: perPage },
            {
                $addFields: {
                    likes: { $size: '$likedBy' },  // Calculate total likes
                    saves: { $size: '$savedBy' }    // Calculate total saves
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    comments: { $size: '$comments' }  // Include the count of comments
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
            },
            {
                $project: {
                    title: 1,
                    desc: 1,
                    comments: 1,
                    userId: 1,
                    image: 1,
                    postType: 1,
                    likes: 1,
                    saves: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    minPrice: 1,
                    maxPrice: 1,
                    'user.firstName': 1,
                    'user.lastName': 1,
                    'user.email': 1,
                    'user.role': 1,
                    'user.portfolio': 1
                }
            }
        ];

        // Apply sorting based on the sortBy parameter
        if (sortBy === 'mostLiked') {
            postsPipeline.push({ $sort: { likes: -1 } });
        } else if (sortBy === 'trending') {
            // Assuming trending is based on likes and comments, adjust as needed
            postsPipeline.push({ $sort: { likes: -1, commentsCount: -1 } });
        } else if (sortBy === 'recent') {
            postsPipeline.push({ $sort: { createdAt: -1 } });
        } else if (sortBy === 'old') {
            postsPipeline.push({ $sort: { createdAt: 1 } });
        }

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
    try {
        // Find the post by ID
        const post = await PostModel.findById(id);

        if (!post) {
            throw new Error('Post not found');
        }

        const updateFields = {};

        // Handle likedBy field
        if (postData.likedBy) {
            postData.likedBy.forEach(userId => {
                if (post.likedBy.includes(userId)) {
                    // Remove userId from likedBy
                    updateFields.$pull = { likedBy: userId };
                } else {
                    // Add userId to likedBy
                    updateFields.$addToSet = { likedBy: userId };
                }
            });
        }

        // Handle savedBy field
        if (postData.savedBy) {
            postData.savedBy.forEach(userId => {
                if (post.savedBy.includes(userId)) {
                    // Remove userId from savedBy
                    updateFields.$pull = { savedBy: userId };
                } else {
                    // Add userId to savedBy
                    updateFields.$addToSet = { savedBy: userId };
                }
            });
        }

        // Handle other fields
        Object.keys(postData).forEach(key => {
            if (key !== 'likedBy' && key !== 'savedBy') {
                updateFields[key] = postData[key];
            }
        });

        // Apply the updates to the post
        return await PostModel.findByIdAndUpdate(id, updateFields, { new: true });
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

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

module.exports.getSavedPosts = async (currentPage = 1, perPage = 10, userId) => {
    try {
        // Define the query to filter posts saved by the specific user
        const query = userId ? { savedBy: userId } : {};

        // Fetch posts with pagination and sorting
        const posts = await PostModel.find(query)
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        // Optionally, you can also fetch the total count of saved posts
        const totalPosts = await PostModel.countDocuments(query);

        return {
            posts,
            totalPosts,
            totalPages: Math.ceil(totalPosts / perPage),
            currentPage
        };
    } catch (error) {
        console.error('Error fetching saved posts:', error);
        throw error;
    }
};

