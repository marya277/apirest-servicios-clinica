
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  identification: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  userType: { type: String, required: true },
  userInfo: { type: mongoose.Schema.Types.ObjectId, refPath: 'userType' }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
