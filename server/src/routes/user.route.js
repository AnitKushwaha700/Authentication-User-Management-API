import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.patch("/me", authMiddleware, updateMyProfile);

export default router;
