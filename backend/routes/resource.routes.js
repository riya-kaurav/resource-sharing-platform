import { Router } from "express";
import {
  uploadResource,
  getResources,
  getResourceById,
  deleteResource
} from "../controllers/resource.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// public
router.get("/", getResources);
router.get("/:id", getResourceById);

// protected
router.post(
  "/",
  verifyJWT,
  upload.single("pdf"),
  uploadResource
);

router.delete("/:id", verifyJWT, deleteResource);

export default router;
