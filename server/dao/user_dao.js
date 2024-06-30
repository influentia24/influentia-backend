const UserModel = require('../models/user_model.js');
const portFolioModel = require('../models/portfolio_model.js');
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
module.exports.getUsers = async (currentPage,perPage,role,isAll)=>{
    let query = {status:'active'};
    if(role){
        query.role = role;
    }
    if(isAll==='true'){
       return await UserModel.find(query).sort({createdAt:-1}); 
    }
    console.log((currentPage-1)*perPage,perPage)
    return await UserModel.find(query).skip((currentPage-1)*perPage).limit(perPage).sort({createdAt:-1});
}
module.exports.getUsersCount = async (role,isAll)=>{
    let query = {status:'active'};
    if(role){
        query.role = role;
    }
    
    return await UserModel.countDocuments(query);
}
module.exports.addPortFolioForUser = async (userId,portfolioId)=>{
    return await UserModel.findByIdAndUpdate(userId,{ portFolio:portfolioId },{ new:true });
}
module.exports.updateUser = async (userId,userData)=>{
    return await UserModel.findById(userId,userData,{ new:true });
}
module.exports.deleteUser = async (userId)=>{
    return await UserModel.findByIdAndDelete(userId);
}
