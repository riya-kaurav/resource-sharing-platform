import Upvote from "../models/upvote.model.js";
import Resource from "../models/resource.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Upvote resource
 */
export const upvoteResource = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;

  const upvote = await Upvote.create({
    userId: req.user._id,
    resourceId
  });

  await Resource.findByIdAndUpdate(resourceId, {
    $inc: { upvoteCount: 1 }
  });

  return res.status(201).json(
    new ApiResponse(201, upvote, "Resource upvoted")
  );
});

/**
 * Remove upvote
 */
export const removeUpvote = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;

  const upvote = await Upvote.findOneAndDelete({
    userId: req.user._id,
    resourceId
  });

  if (!upvote) {
    throw new ApiError(404, "Upvote not found");
  }

  await Resource.findByIdAndUpdate(resourceId, {
    $inc: { upvoteCount: -1 }
  });

  return res.status(200).json(
    new ApiResponse(200, {}, "Upvote removed")
  );
});
