import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;                              // 1. get Cookie form the token
    
    if (!token) {                                                 // 2. Token exist ot not
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    
    const decode = jwt.verify(token, process.env.JWT_SECRET);      // 3. Token Verify
    
    console.log("Decode JWT:", decode);
    
    req.user = decode;                                             // 4. Add request in User information
    
    next();                                                        // 5. Next middleware or Controller
    
  } catch (error) {
    console.error(error);
    
    return res.status(401).json({
      success: false,
      message: "Access token expired or invalid",
    });
  }
};

export default authMiddleware;
