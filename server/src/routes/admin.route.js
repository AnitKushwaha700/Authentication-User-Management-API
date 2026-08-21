import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from "../controllers/admin.controller.js";

import { updateRoleValidator } from "../validators/admin.validator.js";

const router = express.Router();

router.get("/users", authMiddleware, authorizeRoles("admin"), getAllUsers);

router.get("/users/:id", authMiddleware, authorizeRoles("admin"), getUserById);

router.patch(
  "/users/:id/role",
  authMiddleware,
  authorizeRoles("admin"),
  updateRoleValidator,
  updateUserRole,
);

router.delete(
  "/users/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteUser,
);

export default router;
