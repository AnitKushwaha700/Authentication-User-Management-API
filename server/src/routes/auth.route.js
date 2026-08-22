import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import { authRateLimiter } from "../middlewares/rateLimit.middleware.js";

import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  logoutUser,
  refreshAccessToken,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { adminDashboard } from "../controllers/admin.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validators.js";

const router = express.Router();

// === PUBLIC ROUTES ====
router.post("/register", authRateLimiter, registerValidator, registerUser);
router.post("/login", authRateLimiter, loginValidator, loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", authRateLimiter, forgotPassword);
router.post("/reset-password", authRateLimiter, resetPassword);
router.post("/reset-password/:token", authRateLimiter, resetPassword);

// === AUTHENTICATED ROUTES (General Users) ===
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.patch("/change-password", authMiddleware, changePassword);
router.post("/logout", authMiddleware, logoutUser);

// === AUTHORIZED ROUTES (Admin Only) ===
router.get("/admin", authMiddleware, authorizeRoles("admin"), adminDashboard);

export default router;
