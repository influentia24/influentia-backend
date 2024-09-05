const UserModel = require('../models/user_model.js');
const portFolioModel = require('../models/portfolio_model.js');
const { default: mongoose } = require('mongoose');
const Post = require('../models/post_model.js');
const Token = require('../models/toke_model.js');
module.exports.createUser =  async (userData)=>{
 return await UserModel.create(userData)
}
module.exports.findByUserName = async (username)=>{
    return await UserModel.findOne({ username });
}
module.exports.findByEmail = async (email)=>{
    console.log(email,'inside email function');
    
    return await UserModel.find({email:email})
}
module.exports.findByUserNameOrMail = async (username)=>{
    return await UserModel.findOne({ $or:[{username:username},{email:username}] });
}
module.exports.getUsers = async (currentPage = 1, perPage = 10, role, isAll, sortBy) => {
    try {
        // Base query for active users
        let query = { status: 'active' };

        // Add role filter if provided
        if (role) {
            query.role = role;
        }

        // Sort field and order based on the sortBy parameter
        let sortCriteria = {};

        switch (sortBy) {
            case 'mostFollowers':
                sortCriteria = { 'followers.length': -1 };  // Sort by the number of followers
                break;
            case 'mostRecent':
                sortCriteria = { createdAt: -1 };  // Sort by creation date (most recent first)
                break;
            case 'oldest':
                sortCriteria = { createdAt: 1 };  // Sort by creation date (oldest first)
                break;
            default:
                sortCriteria = { createdAt: -1 };  // Default sort (most recent)
        }

        // If `isAll` is true, return all matching users without pagination
        if (isAll === 'true') {
            return await UserModel.find(query).sort(sortCriteria);
        }

        // Paginated query with sorting
        const users = await UserModel.find(query)
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .sort(sortCriteria);

        // Get total count of matching users for pagination
        const totalCount = await UserModel.countDocuments(query);

        return {
            users,
            totalCount,
            totalPages: Math.ceil(totalCount / perPage),
            currentPage
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
module.exports.getUsersCount = async (role,isAll)=>{
    let query = {status:'active'};
    if(role){
        query.role = role;
    }
    
    return await UserModel.countDocuments(query);
}
module.exports.addPortFolioForUser = async (userId, portfolioId) => {
    try {
        const id = new mongoose.Types.ObjectId(userId);
        console.log(id, portfolioId);

        // Find the user by id
        const user = await UserModel.findById(id);
        if (!user) {
            console.log(`User with id ${userId} not found.`);
            return null;
        }
        console.log(user);

        // Update the user's portfolio
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: id },
            { $set: { portfolio: portfolioId } }, // Use the correct field and value
            { new: true }
        );

        return updatedUser;
    } catch (error) {
        console.error(`Error updating user with id ${userId}:`, error);
        throw error;
    }
}
module.exports.updateUser = async (userId,userData)=>{
    const user = await UserModel.findById(id);
    const updateFields = {};

    if(userData.follower){
        userData.follower.forEach(follow => {
            if (user.followedBy.includes(follow)) {
                // Remove follow from follower
                updateFields.$pull = { followedBy: follow };
            } else {
                // Add follow to follower
                updateFields.$addToSet = { followedBy: follow };
            }
        });
    }
    Object.keys(userData).forEach(key => {
        if (key !== 'followedBy') {
            updateFields[key] = userData[key];
        }
    });
    return await UserModel.findById(userId,userData,{ new:true });
}
module.exports.deleteUser = async (userId)=>{
    return await UserModel.findByIdAndDelete(userId);
}
module.exports.getUserById = async (userId)=>{
    return await UserModel.findOne({_id:userId})
}
module.exports.getPortfoliosWithUserRole = async (currentPage = 1, perPage = 10, role, sortBy) => {
    try {
        // Base query to match users by role
        let query = { role: role };

        // Default sort field and order
        let sortField = 'createdAt';  // Default sort field
        let sortOrder = -1;           // Default sort order (descending)

        // Determine sort criteria based on sortBy parameter
        switch (sortBy) {
            case 'recent':
                sortField = 'createdAt';
                sortOrder = -1;  // Most recent first
                break;
            case 'oldest':
                sortField = 'createdAt';
                sortOrder = 1;   // Oldest first
                break;
            case 'name':
                sortField = 'name';  // Example for sorting by name, if applicable
                sortOrder = 1;       // Alphabetical order
                break;
            case 'followers':
                // Add followers count to sort criteria
                sortField = 'followersCount';
                sortOrder = -1;  // Most followers first
                break;
            default:
                sortField = 'createdAt';
                sortOrder = -1;  // Default to most recent
        }

        return await UserModel.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'portfolios',
                    localField: 'portfolio',
                    foreignField: '_id',
                    as: 'portFolio'
                }
            },
            { $unwind: '$portFolio' },
            {
                $addFields: {
                    followersCount: { $size: '$followedBy' }  // Calculate number of followers
                }
            },
            {
                $sort: { [sortField]: sortOrder }  // Apply sorting
            },
            { $skip: (currentPage - 1) * perPage },
            { $limit: perPage }
        ]);
    } catch (error) {
        console.error('Error fetching portfolios with user role:', error);
        throw error;
    }
};
module.exports.searchUsers = async (currentPage, perPage, searchTerm, role, categories, minFollowers, maxFollowers, avgMinPostLikes, avgMaxPostLikes) => {
    try {
        const sanitizedSearchTerm = searchTerm.replace(/['"]/g, '');
        const skipData = (currentPage - 1) * perPage;
        const regex = new RegExp(sanitizedSearchTerm, 'i'); // Case insensitive search

        // Convert string to numbers if present
        const minFollowersNum = minFollowers ? parseInt(minFollowers, 10) : undefined;
        const maxFollowersNum = maxFollowers ? parseInt(maxFollowers, 10) : undefined;
        const avgMinPostLikesNum = avgMinPostLikes ? parseInt(avgMinPostLikes, 10) : undefined;
        const avgMaxPostLikesNum = avgMaxPostLikes ? parseInt(avgMaxPostLikes, 10) : undefined;

        // Create a base query
        const query = {
            $or: [
                { username: regex },
                { email: regex },
                { firstName: regex },
                { lastName: regex }
            ],
        };

        // Add role filter if provided
        if (role) {
            query.role = { $in: [role] };
        }

        // Add categories filter if provided
        if (categories && categories.length > 0) {
            query.categories = { $in: categories };
        }

        // Calculate the average followers per user and filter based on minFollowers and maxFollowers
        let userIdsWithAvgFollowers = [];

        if (minFollowersNum !== undefined || maxFollowersNum !== undefined) {
            const matchFollowers = {};

            if (minFollowersNum !== undefined) {
                matchFollowers.$gte = minFollowersNum;
            }
            if (maxFollowersNum !== undefined) {
                matchFollowers.$lte = maxFollowersNum;
            }

            const usersWithAvgFollowers = await UserModel.aggregate([
                {
                    $project: {
                        _id: 1,
                        avgFollowers: { $size: { $ifNull: ["$followedBy", []] } } // Handle missing or non-array `followedBy`
                    }
                },
                {
                    $match: {
                        avgFollowers: matchFollowers
                    }
                }
            ]);

            userIdsWithAvgFollowers = usersWithAvgFollowers.map(user => user._id);
            console.log(usersWithAvgFollowers, 'usersWithAvgFollowers', minFollowersNum, maxFollowersNum);
        }

        // Add average followers filter if provided
        if (userIdsWithAvgFollowers.length > 0) {
            query._id = { $in: userIdsWithAvgFollowers };
        }

        // Aggregate posts to calculate average likes per user (if necessary)
        let userIdsWithAvgLikes = [];
        if (avgMinPostLikesNum !== undefined || avgMaxPostLikesNum !== undefined) {
            const matchLikes = {};

            if (avgMinPostLikesNum !== undefined) {
                matchLikes.$gte = avgMinPostLikesNum;
            }
            if (avgMaxPostLikesNum !== undefined) {
                matchLikes.$lte = avgMaxPostLikesNum;
            }

            const usersWithAvgLikes = await Post.aggregate([
                {
                    $group: {
                        _id: '$userId',
                        avgLikes: { $avg: '$likes' }
                    }
                },
                {
                    $match: {
                        avgLikes: matchLikes
                    }
                },
                {
                    $project: { _id: 1 }
                }
            ]);

            userIdsWithAvgLikes = usersWithAvgLikes.map(user => user._id);
        }

        // Combine userIdsWithAvgFollowers and userIdsWithAvgLikes filters
        if (userIdsWithAvgLikes.length > 0 || userIdsWithAvgFollowers.length > 0) {
            query._id = {
                $in: userIdsWithAvgLikes.length > 0 && userIdsWithAvgFollowers.length > 0
                    ? userIdsWithAvgLikes.filter(id => userIdsWithAvgFollowers.includes(id))
                    : userIdsWithAvgLikes.length > 0 ? userIdsWithAvgLikes : userIdsWithAvgFollowers
            };
        }

        console.log(query);

        const count = await UserModel.countDocuments(query);
        const users = await UserModel.find(query).skip(skipData).limit(perPage || 10).populate('portfolio');

        return { total: count, users };
    } catch (error) {
        throw new Error('Error searching users: ' + error.message);
    }
};

module.exports.storeResetToken = async (userId, resetToken, expiration) => {
    try {
      tokenObj = {
        token: resetToken,
        userId: userId,
        expiration: expiration,
      }
      const token = await Token.create(tokenObj)
      return true;
    } catch (error) {
      console.error('Error storing reset token:', error);
      return false;
    }
  };
  
module.exports.getResetTokenByToken = async(data)=>{
    try{
        let user = await Token.find({
            token:data
        })
        return user
    }catch(error){
        throw error;
    }
  }

module.exports.updatePassword = async(userId,newPassword)=>{
    try{
        const result = await UserModel.findOneAndUpdate(userId,
            { password: newPassword },
          );
        return true
    }catch(error){
        throw error;
    }
  }

  module.exports.deleteResetTokenByToken = async(token)=>{
    try{
        const result = await Token.findOneAndDelete({ token })
        if (!result) {
            console.log("Token not found");
            return false;
        }
        return true
    }catch(error){
        throw error;
    }
  }