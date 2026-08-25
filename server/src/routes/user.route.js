import express from "express";
import mongoose from "mongoose";

import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
  getMySessions,
  deleteMySession,
  deleteAllMySessions,
} from "../controllers/user.controller.js";

import { validateSessionId } from "../validators/common.validator.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.patch("/me", authMiddleware, updateMyProfile);
router.delete("/me", authMiddleware, deleteMyAccount);

router.get("/sessions", authMiddleware, getMySessions);
router.delete("/sessions/:sessionsId", authMiddleware, deleteMySession);
router.delete("/sessions", authMiddleware, deleteAllMySessions);
router.delete(
  "/sessions/:sessionId",
  authMiddleware,
  validateSessionId,
  deleteMySession,
);

export default router;
