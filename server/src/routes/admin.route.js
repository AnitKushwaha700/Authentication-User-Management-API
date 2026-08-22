import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import { updateRoleValidator } from "../validators/admin.validator.js";
import { validateObjectId } from "../validators/common.validator.js";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from "../controllers/admin.controller.js";

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
  updateRoleValidator,
  validateObjectId,
  updateUserRole,
);

router.delete(
  "/users/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validateObjectId,
  deleteUser,
);

export default router;
