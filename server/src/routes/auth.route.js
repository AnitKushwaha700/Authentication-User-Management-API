import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/role.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validators.js";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
  updateProfile,
  changePassword,
  deleteAccount,
  adminDashboard,
  getAllUsers,
  deleteUserByAdmin,
  updateUserRole,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.patch("/change-password", authMiddleware, changePassword);
router.delete("/account", authMiddleware, deleteAccount);
router.post("/logout", logoutUser);
router.get("/admin", authMiddleware, adminMiddleware, adminDashboard);
router.get("/admin/users", authMiddleware, adminMiddleware, getAllUsers);
router.delete(
  "/admin/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserByAdmin,
);
router.patch(
  "/admin/users/:id/role",
  authMiddleware,
  adminMiddleware,
  updateUserRole,
);
export default router;
