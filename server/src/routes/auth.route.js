import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
  updateProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/logout", logoutUser);

export default router;
