import cloudinary from "../utils/cloudinaryUpload.js";
import Resource from "../models/Resource.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const uploadResource = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "PDF file is required");
  }

  const { title, description, tags, type } = req.body;

  if (!title || !type) {
    throw new ApiError(400, "Title and type are required");
  }


  // upload to cloudinary
  const uploadResult = await uploadPdfToCloudinary(req.file.buffer);

  const resource = await Resource.create({
    title,
    description,
    type,
    tags: tags ? tags.split(",").map(t => t.trim()) : [],
    pdfUrl: uploadResult.secure_url,
    uploadedBy: req.user.id
  });

  res
    .status(201)
    .json(new ApiResponse(201, resource, "Resource uploaded successfully"));
});

export const getResources = asyncHandler(async (req, res) => {
  const { search, type, tag, sort = "latest" } = req.query;

  const query = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (type) {
    query.type = type;
  }

  if (tag) {
    query.tags = tag;
  }

  let sortOption = { createdAt: -1 };
  if (sort === "popular") {
    sortOption = { upvoteCount: -1 };
  }

  const resources = await Resource.find(query)
    .sort(sortOption)
    .populate("uploadedBy", "_id");

  res.json(
    new ApiResponse(200, resources, "Resources fetched successfully")
  );
});


export const upvoteResource = asyncHandler(async (req, res) => {
    const { resourceId } = req.params;
    const userId = req.user.id;
    const resource = await Resource.find
        .find
        .findById(resourceId);
    if (!resource) {
        throw new ApiError(404, "Resource not found");
    }
    if (resource.upvotedBy.includes(userId)) {
        return res.json(new ApiResponse(200, resource, "Resource already upvoted"));
    }
    resource.upvotedBy.push(userId);
    resource.upvoteCount = resource.upvotedBy.length;
    await resource.save();
    res.json(new ApiResponse(200, resource, "Resource upvoted successfully"));
});

export const downvoteResource = asyncHandler(async (req, res) => {
    const { resourceId } = req.params;
    const userId = req.user.id;
    const resource = await Resource.find
        .find
        .findById(resourceId);
    if (!resource) {
        throw new ApiError(404, "Resource not found");
    }
    if (!resource.upvotedBy.includes(userId)) {
        return res.json(new ApiResponse(200, resource, "Resource not upvoted yet"));
    }
    resource.upvotedBy = resource.upvotedBy.filter(id => id.toString() !== userId);
    resource.upvoteCount = resource.upvotedBy.length;
    await resource.save();
    res.json(new ApiResponse(200, resource, "Resource downvoted successfully"));
});

// in the following code snippets, the first one sets up multer middleware to handle PDF file uploads,
// and the second one defines a utility function to upload PDF files to Cloudinary using their upload_stream method.
// The uploadPdfToCloudinary function takes a file buffer as input and uploads it to Cloudinary, returning
// a promise that resolves with the upload result or rejects with an error.
// logic for upvoting and downvoting resources has also been added.