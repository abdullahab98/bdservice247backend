import User from "../models/User.js";
import bcrypt from "bcryptjs";

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, username, email, phone, password, transaction_id } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      phone,
      password: hashedPass,
      transaction_id,
    });
    
    // Password bad diye pathano
    const userResult = user.toObject();
    delete userResult.password;

    res.apiSuccess(userResult, "User created", 201);
  } catch (err) {
    res.apiError(err, "Failed to create user", 500);
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.apiSuccess(users, "Users retrieved");
  } catch (err) {
    res.apiError(err, "Failed to get users", 500);
  }
};

// GET SINGLE USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.apiError("User not found", "User not found", 404);
    }

    res.apiSuccess(user, "User retrieved");
  } catch (err) {
    res.apiError(err, "Failed to get user", 500);
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const updateData = req.body;

    // Jate password update na hoy
    delete updateData.password;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    res.apiSuccess(user, "User updated");
  } catch (err) {
    res.apiError(err, "Failed to update user", 500);
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.apiSuccess(null, "User deleted");
  } catch (err) {
    res.apiError(err, "Failed to delete user", 500);
  }
};

// GET USER PROFILE (Logged in user)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.apiError("User not found", "User not found", 404);
    }

    res.apiSuccess(user, "Profile retrieved");
  } catch (err) {
    res.apiError(err, "Failed to get profile", 500);
  }
};