import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPass
    });

    // Generate JWT Token
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const data = {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      },
      token: token
    };

    res.apiSuccess(data, "Admin created successfully", 201);

  } catch (err) {
    res.apiError(err, "Admin registration failed", 500);
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.apiError("Admin not found", "Admin not found", 404);
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.apiError("Invalid password", "Invalid password", 400);
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.apiSuccess({ token }, "Admin login successful");

  } catch (err) {
    res.apiError(err, "Admin login failed", 500);
  }
};