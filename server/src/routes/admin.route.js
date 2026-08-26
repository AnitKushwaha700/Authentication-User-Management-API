import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

import { updateRoleValidator } from "../validators/admin.validator.js";
import {
  validateObjectId,
  validateRole,
} from "../validators/common.validator.js";

import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  updateUserStatus,
} from "../controllers/admin.controller.js";
import { deleteMySession } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", authMiddleware, authorizeRoles("admin"), getAllUsers);

router.get(
  "/users/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validateObjectId,
  getUserById,
);

router.patch(
  "/users/:id/role",
  authMiddleware,
  authorizeRoles("admin"),
  validateObjectId,
  updateRoleValidator,
  validateRole,
  updateUserRole,
);

router.patch(
  "/users/:id/status",
  authMiddleware,
  authorizeRoles("admin"),
  validateObjectId,
  updateUserStatus,
);

router.delete(
  "/users/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validateObjectId,
  deleteUser,
);

export default router;
