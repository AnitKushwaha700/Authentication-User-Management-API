import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;                              // 1. get Cookie form the token

    if (!token) {                                                 // 2. Token exist ot not
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Found.",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);      // 3. Token Verify

    req.user = decode;                                             // 4. Add request in User information

    next();                                                        // 5. Next middleware or Controller
    
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default authMiddleware;
