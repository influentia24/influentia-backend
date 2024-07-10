const UserModel = require('../models/user_model.js');
const portFolioModel = require('../models/portfolio_model.js');
const { default: mongoose } = require('mongoose');
module.exports.createUser =  async (userData)=>{
 return await UserModel.create(userData)
}
module.exports.findByUserName = async (username)=>{
    return await UserModel.findOne({ username });
}
module.exports.findByEmail = async (email)=>{
    return await UserModel.findOne({ email });
}
module.exports.findByUserNameOrMail = async (username)=>{
    return await UserModel.findOne({ $or:[{username:username},{email:username}] });
}
module.exports.getUsers = async (currentPage,perPage,role,isAll,sort)=>{
    let query = {status:'active'};
    let sortField = sort?.sortField || 'createdAt'
    let sortOrder = sort?.sortOrder || -1;
    if(role){
        query.role = role;
    }
    if(isAll==='true'){
       return await UserModel.find(query).sort({createdAt:-1}); 
    }
    return await UserModel.find(query).skip((currentPage-1)*perPage).limit(perPage).sort({[sortField]:sortOrder});
}
module.exports.getUsersCount = async (role,isAll)=>{
    let query = {status:'active'};
    if(role){
        query.role = role;
    }
    
    return await UserModel.countDocuments(query);
}
module.exports.addPortFolioForUser = async (userId,portfolioId)=>{
    const id = new mongoose.Types.ObjectId(userId);
    console.log(id,portfolioId);
    const user =await UserModel.find({_id:id});
    console.log(user);
    return await UserModel.findOneAndUpdate({_id:id},{portfolio:id},{new:true});
}
module.exports.updateUser = async (userId,userData)=>{
    return await UserModel.findById(userId,userData,{ new:true });
}
module.exports.deleteUser = async (userId)=>{
    return await UserModel.findByIdAndDelete(userId);
}
module.exports.getUserById = async (userId)=>{
    return await UserModel.findOne({_id:userId})
}
module.exports.getPortfoliosWithUserRole = async (currentPage,perPage,role)=>{
    let query = {role:role};
    console.log(role);
    return await UserModel.aggregate([
        {
            $match:query
        },
        {
            $lookup:{
                from:'portfolios',
                localField:'portfolio',
                foreignField:'_id',
                as:'portFolio'
            }
        },
        {
            $unwind:'$portFolio'
        },
        {
            $skip:(currentPage-1)*perPage
        },
        {
            $limit:perPage
        }
    ]);
}
