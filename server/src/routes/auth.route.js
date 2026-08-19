import express from "express";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/logout", logoutUser);

export default router;
