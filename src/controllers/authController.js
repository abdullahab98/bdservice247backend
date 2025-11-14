import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import TokenBlacklist from "../models/TokenBlacklist.js";

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

    res.json({ message: "Registration successful! Wait for admin approval." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.status !== "success")
      return res.status(403).json({ error: "Account pending admin approval" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const checkTokenStatus = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(200).json({ valid: false, message: "No token provided" });
    }
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return res.status(200).json({ valid: false, message: "Token has been logged out" });
    }

    // 2. JWT verification check
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
    
        return res.status(200).json({ valid: false, message: "Token is invalid or expired" });
      }
     
      res.status(200).json({ valid: true, message: "Token is valid" });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
