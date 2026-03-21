// server/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(' ')[1];

        // Ensure this matches your .env exactly: JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}

export default protect;