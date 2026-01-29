import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  getMe
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);

// protected
router.get("/me", verifyJWT, getMe);

export default router;
