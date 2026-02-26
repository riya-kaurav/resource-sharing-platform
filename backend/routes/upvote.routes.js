import { Router } from "express";
import {
  upvoteResource,
  removeUpvote
} from "../controllers/upvote.controller.js";

const router = Router();

router.post("/:resourceId", upvoteResource);
router.delete("/:resourceId", removeUpvote);

export default router;
