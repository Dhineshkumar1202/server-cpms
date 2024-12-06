const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
      console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if(!decoded){
        return res.status(401).json({ message: "Token is not valid , please do provide valid token" });
       }
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Error verifying token:", error); 
        res.status(401).json({ message: "Token verification failed", error: error.message });
    }
};

module.exports = { protect };
