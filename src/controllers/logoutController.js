import TokenBlacklist from "../models/TokenBlacklist.js";

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(400).json({ error: "No token provided" });

    // Token blacklist
    await TokenBlacklist.create({
      token: token,
      expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // token expiry
    });

    res.json({ message: "Logged out successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
