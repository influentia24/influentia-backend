const postDAO = require('../dao/post_dao'); // Adjust the path as necessary
const { uploadFile } = require('../helper/helper-function');


module.exports.createPost = async (req, res) => {
    try {
        const post = await postDAO.createPost(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAllPosts = async (req, res) => {
    try {
        const currentPage = req.query.currentPage || 1;
        const perPage = req.query.perPage || 10;
        const role = req.query.role || null
        const postType = req.query.postType || null
        const status = req.query.status || null
        const sortBy = req.query.sortBy || 'recent'
        const posts = await postDAO.getAllPosts(currentPage, perPage, role, postType, status,sortBy);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getPosts = async (req, res) => {
    const { page, perPage, userId } = req.query;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(perPage) || 10;

    try {
        const posts = await postDAO.getPosts(currentPage, itemsPerPage, userId);
        const totalCount = await postDAO.getPostsCount(userId);
        res.status(200).json({ data: posts, total: totalCount, currentPage, itemsPerPage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getPostById = async (req, res) => {
    try {
        const post = await postDAO.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updatePost = async (req, res) => {
    try {
        const post = await postDAO.updatePost(req.params.id, req.body);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes = post.likedBy ? post.likedBy.length : 0;
        post.saves = post.savedBy ? post.savedBy.length : 0;
        res.status(200).json({ post, message: 'Post updated successfuly' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deletePost = async (req, res) => {
    try {
        const post = await postDAO.deletePost(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.createComment = async (req, res) => {
    try {
        const comment = await postDAO.createComment(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getCommentsByPostId = async (req, res) => {
    try {
        const params = req.body;
        const limit = params.perPage;
        const currPage = params.currentPage;
        const comments = await postDAO.getCommentsByPostId(req.params.postId,currPage,limit);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getCommentById = async (req, res) => {
    try {
        const comment = await postDAO.getCommentById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        const comment = await postDAO.updateComment(req.params.id, req.body);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        const comment = await postDAO.deleteComment(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.getSavedPosts = async (req, res) => {
    try {
        const currentPage = req.query.currentPage || 1;
        const perPage = req.query.perPage || 10;
        const userId = req.query.userId
        const posts = await postDAO.getSavedPosts(currentPage, perPage, userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.uploadImage = async (req,res) =>{
    try {
        const file = req.file;
        let key = null;
        if(file){
           key = await uploadFile(file)
        }
        res.status(200).json(key);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}