import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("_id role isActive");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked",
      });
    }

    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Access token expired or invalid",
    });
  }
};

export default authMiddleware;
