//authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log("Token received from headers:", token);

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded.id);

      // Attach user to the request object
      req.user = await User.findById(decoded.id).select('-password');
      console.log("User retrieved from token:", req.user);

      if (!req.user) {
        console.error("User not found");
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.log("No token found in the request header");
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
