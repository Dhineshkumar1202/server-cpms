const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/config");
require("dotenv").config;

// Middleware to verify any authenticated user
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded; // Attach the user details to the request object
    next();
  } catch (error) {
    console.log(error);
    
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to verify admin user
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authMiddleware, verifyAdmin };
