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
} from "../controllers/auth.controller.js";
import { adminDashboard } from "../controllers/admin.controller.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/logout", logoutUser);
router.get("/admin", authMiddleware, authorizeRoles("admin"), adminDashboard);

export default router;
