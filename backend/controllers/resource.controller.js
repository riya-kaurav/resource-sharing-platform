import Resource from "../models/resource.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/**
 * Upload resource
 */
export const uploadResource = asyncHandler(async (req, res) => {
  const { title, description, tags, type } = req.body;

  if (!req.file) {
    throw new ApiError(400, "PDF file required");
  }

  const cloudinaryResult = await uploadOnCloudinary(req.file.path);

  const resource = await Resource.create({
    title,
    description,
    tags,
    type,
    pdfUrl: cloudinaryResult.secure_url,
    uploadedBy: req.user._id
  });

  return res.status(201).json(
    new ApiResponse(201, resource, "Resource uploaded")
  );
});

/**
 * Get all resources
 */
export const getResources = asyncHandler(async (req, res) => {
  const { type, tag, search } = req.query;

  const query = {};

  if (type) query.type = type;
  if (tag) query.tags = tag;
  if (search) query.title = { $regex: search, $options: "i" };

  const resources = await Resource.find(query)
    .populate("uploadedBy", "name")
    .sort({ upvoteCount: -1 });

  return res.status(200).json(
    new ApiResponse(200, resources, "Resources fetched")
  );
});

/**
 * Get single resource
 */
export const getResourceById = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id)
    .populate("uploadedBy", "name");

  if (!resource) {
    throw new ApiError(404, "Resource not found");
  }

  return res.status(200).json(
    new ApiResponse(200, resource, "Resource fetched")
  );
});

/**
 * Delete resource (owner only)
 */
export const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    throw new ApiError(404, "Resource not found");
  }

  if (!resource.uploadedBy.equals(req.user._id)) {
    throw new ApiError(403, "Not authorized");
  }

  await resource.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, {}, "Resource deleted")
  );
});
