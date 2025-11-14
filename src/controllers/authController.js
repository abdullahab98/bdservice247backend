import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import TokenBlacklist from "../models/TokenBlacklist.js"; // <-- Import kora ache

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, username, email, phone, password, transaction_id } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      phone,
      password: hashedPass,
      transaction_id,
    });

    await user.save();

    res.apiSuccess(null, "Registration successful! Wait for admin approval.", 201);
  } catch (err) {
    res.apiError(err, "Registration failed", 500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.apiError("User not found", "User not found", 404);
    }

    if (user.status !== "success") {
      return res.apiError("Account pending admin approval", "Account pending admin approval", 403);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.apiError("Invalid password", "Invalid password", 400);
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.apiSuccess({ token }, "Login successful");
  } catch (err) {
    res.apiError(err, "Login failed", 500);
  }
};

// 'checkTokenStatus' updated with new handler
export const checkTokenStatus = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.apiSuccess({ valid: false }, "No token provided");
    }

    // 1. Blacklist check
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return res.apiSuccess({ valid: false }, "Token has been logged out");
    }

    // 2. JWT verification check
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.apiSuccess({ valid: false }, "Token is invalid or expired");
      }
      
      res.apiSuccess({ valid: true }, "Token is valid");
    });

  } catch (err) {
    res.apiError(err, "Token status check failed", 500);
  }
};