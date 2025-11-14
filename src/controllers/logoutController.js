import TokenBlacklist from "../models/TokenBlacklist.js";

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.apiError("No token provided", "No token provided", 400);
    }

    // Token blacklist
    await TokenBlacklist.create({
      token: token,
      expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // token expiry
    });

    res.apiSuccess(null, "Logged out successfully");

  } catch (err) {
    res.apiError(err, "Logout failed", 500);
  }
};