const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'portfolio' },
  followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expiration: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
