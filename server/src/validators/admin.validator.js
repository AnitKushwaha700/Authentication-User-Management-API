export const updateRoleValidator = (req, res, next) => {
  const { role } = req.body;

  const allowedRoles = [
    "user",
    "admin",
    "restaurant",
  ];

  if (!role) {
    return res.status(400).json({
      success: false,
      message: "Role is required",
    });
  }

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role",
    });
  }

  next();
};