
import User from '@/models/User';
import { connectToDatabase } from '@/utils/db';
import bcrypt from 'bcryptjs';

export const getUsers = async (params: any = {}) => {
  try {
    await connectToDatabase();
    
    const { page = 1, limit = 10, search = '' } = params;
    
    const query: any = {};
    
    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Execute query with pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    const users = await User.find(query)
      .select('-password') // Exclude password
      .skip(skip)
      .limit(Number(limit));
      
    const totalUsers = await User.countDocuments(query);
    
    return {
      users,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalUsers / Number(limit)),
        totalItems: totalUsers
      }
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    // Create new user
    const user = new User({
      ...userData,
      password: hashedPassword
    });
    
    await user.save();
    
    // Return user without password
    const newUser = user.toObject();
    delete newUser.password;
    
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    await connectToDatabase();
    
    // If password is being updated, hash it
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDatabase();
    await User.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
