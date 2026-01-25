import mongoose from "mongoose";
import Upvote from "../models/Upvote.model.js";
import Resource from "../models/Resource.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const upvoteResource = asyncHandler(async (req, res) => {
  const { resourceId } = req.params; // taking resourceId from URL params
  const userId = req.user.id; // assuming userId is available in req.user after authentication middleware

  const session = await mongoose.startSession();  // start a mongoose session
  session.startTransaction();  // start a transaction

  try {
    const upvote = await Upvote.create(
      [{ userId, resourceId }],
      { session }
    );                          // create an upvote document

    await Resource.findByIdAndUpdate(
      resourceId,
      { $inc: { upvoteCount: 1 } },  // increment upvoteCount by 1
      { session }
    );                                // increment the upvoteCount in Resource document

    await session.commitTransaction();
    session.endSession();                    // commit the transaction and end the session

    res.json(new ApiResponse(200, null, "Resource upvoted"));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();                // abort the transaction and end the session

    if (error.code === 11000) {
      throw new ApiError(400, "You have already upvoted this resource");
    }

    throw error;
  }
});
