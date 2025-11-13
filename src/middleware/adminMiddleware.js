import jwt from "jsonwebtoken";

export const adminProtect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({ error: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admin only" });
    }

    req.admin = decoded;
    next();

  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
