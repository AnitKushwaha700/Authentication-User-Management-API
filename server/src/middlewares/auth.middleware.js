import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // 1. get Cookie form the token
    const token = req.cookies.token;

    // 2. Token exist ot not
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Found.",
      });
    }

    // 3. Token Verify
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Add request in User information
    req.user = decode;

    // 5. Next middleware or Controller
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default authMiddleware;
