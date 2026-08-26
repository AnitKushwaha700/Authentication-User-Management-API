import mongoose from "mongoose";

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
  }
  next();
};

export const validateSessionId = (req, res, next) => {
  const { sessionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid session ID",
    });
  }
  
  next();
};

// ------------------------ Validate-Role ------------------------------- //

export const validateRole = (req, res, next) => {
  const { role } = req.body;

  const allowedRoles = [
    "user",
    "admin",
    "restaurant",
  ];

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role",
      allowedRoles,
    });
  }

  next();
};


