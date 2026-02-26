import { Router } from "express";
import {
  uploadResource,
  getResources,
  getResourceById,
  deleteResource
} from "../controllers/resource.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// public
router.get("/", getResources);
router.get("/:id", getResourceById);

// routes
router.post(
  "/",
  upload.single("pdf"),
  uploadResource
);

router.delete("/:id", deleteResource);

export default router;
