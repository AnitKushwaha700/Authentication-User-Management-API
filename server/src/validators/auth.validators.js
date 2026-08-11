export const registerValidator = (req, res, next) => {
  const { name, email, password } = req.body;

  // Required Fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }

  // Name validations
  if (name.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Name must be at least 3 characters",
    });
  }

  // Email validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email",
    });
  }

  // Password validations
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  next();
};


export const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  // Required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email",
    });
  }

  // Password length
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  next();
};