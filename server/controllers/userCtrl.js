const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");




const registerMemberCtrl = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        // Hash the password and create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,

            password: hashedPassword,
        });

        // Generate a JWT token
        const token = jwt.sign(
            { email: user.email, id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        // Set the token in an HTTP-only cookie
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        });

        // Respond with success
        return res.status(201).json({
            success: true,
            token,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("REGISTER MEMBER ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "User registration failed. Please try again later.",
        });
    }
};




const loginMemberCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill out all required fields.",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered. Please sign up to continue.",
            });
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password.",
            });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id, role: user.role },
            process.env.JWT_SECRET
        );

        user.token = token;
        user.password = undefined; // Remove password from response

        const options = {
            httpOnly: true, // For security purposes
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "User login successful.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again later.",
        });
    }
};
const getAllUsersCtrl = async (req, res) => {
    try {
      // Admin check
      if (req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admins only.",
        });
      }
  
      // Get all users
      const users = await userModel.find().select("-password"); // Hide password
  
      return res.status(200).json({
        success: true,
        users,
        message: "Users fetched successfully",
      });
    } catch (error) {
      console.error("FETCH USERS ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch users",
      });
    }
  };
  




module.exports = { registerMemberCtrl, loginMemberCtrl ,getAllUsersCtrl};
