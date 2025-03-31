
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  }
}, {
  timestamps: true
});

// Fix: More robust check to prevent errors during hot module reloading
const User = mongoose.models && mongoose.models.User 
  ? mongoose.models.User 
  : mongoose.model('User', UserSchema);

export default User;
