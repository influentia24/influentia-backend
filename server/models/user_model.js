const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: 'user' }, // Add a default role if necessary
    status: { type: String, default: 'active' },
    portfolio: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
