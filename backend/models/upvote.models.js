import mongoose from "mongoose";

const { Schema } = mongoose;

const UpvoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    resourceId: {
      type: Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);


//  One user can upvote a resource only once indexing userId and resourceId combination

UpvoteSchema.index(
  { userId: 1, resourceId: 1 },
  { unique: true }
);

export default mongoose.model("Upvote", UpvoteSchema);
