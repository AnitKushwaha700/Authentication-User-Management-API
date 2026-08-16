import express from "express";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.post("/logout", logoutUser);

export default router;
