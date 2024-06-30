const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{ type:String, required:true},
    password:{ type:String, required:true},
    email:{ type:String, required:true},
    firstName:{ type:String, required:true},
    lastName:{ type:String, required:true},
    role:{ type:String},
    status:{ type:String, default:'active'},
    portFolio:{ type:mongoose.Schema.Types.ObjectId, ref:'portfolio'},
    createdAt:{ type:Date, default:Date.now},
    updatedAt:{ type:Date, default:Date.now},
},{timestamps:true});
const User = mongoose.model('user',userSchema);
 
module.exports = User;