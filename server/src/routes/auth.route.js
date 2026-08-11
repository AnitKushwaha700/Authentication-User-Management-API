import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
  updateProfile,
  changePassword,
  deleteAccount,
  adminDashboard,
} from "../controllers/auth.controller.js";
import adminMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/account", authMiddleware, deleteAccount);
router.post("/logout", logoutUser);
router.get("/admin", authMiddleware, adminMiddleware, adminDashboard)

export default router;
