const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                message: "Not authorized. Token missing or malformed." 
            });
        }

        const token = authorizationHeader.split(" ")[1];
        console.log("Received Token:", token);

      
        console.log("JWT Secret:", process.env.JWT_SECRET);

     
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        if (!decoded) {
            return res.status(401).json({ 
                message: "Invalid token. Please provide a valid token." 
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(401).json({ 
            message: "Token verification failed.", 
            error: error.message 
        });
    }
};

module.exports = { protect };
