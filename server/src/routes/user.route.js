import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.patch("/me", authMiddleware, updateMyProfile);
router.delete("/me", authMiddleware, deleteMyAccount);

export default router;
