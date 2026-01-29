import { Router } from "express";
import {
  upvoteResource,
  removeUpvote
} from "../controllers/upvote.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// protected
router.post("/:resourceId", verifyJWT, upvoteResource);
router.delete("/:resourceId", verifyJWT, removeUpvote);

export default router;
