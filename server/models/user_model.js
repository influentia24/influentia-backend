const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: 'influenter' }, // Add a default role if necessary
    status: { type: String, default: 'active' },
    portfolio: { type: mongoose.Schema.Types.ObjectId, ref: 'portfolio' },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
