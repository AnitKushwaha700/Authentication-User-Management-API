import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

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

const router = express.Router();

// === PUBLIC ROUTES ====
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/reset-password/:token", resetPassword);

// === AUTHENTICATED ROUTES (General Users) ===
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.patch("/change-password", authMiddleware, changePassword);
router.post("/logout", authMiddleware, logoutUser);

// === AUTHORIZED ROUTES (Admin Only) ===
router.get("/admin", authMiddleware, authorizeRoles("admin"), adminDashboard);

export default router;
