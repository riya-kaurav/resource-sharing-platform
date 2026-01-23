import mongoose from "mongoose";

const { Schema } = mongoose;

const ResourceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
      index: true
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000
    },

    pdfUrl: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true,
      enum: ["notes", "pyqs", "coding", "interview"],
      index: true
    },

    tags: {
      type: [String],
      default: [],
      index: true
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    upvoteCount: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

//  Text search on title + description
 
ResourceSchema.index({
  title: "text",
  description: "text"
});


//   For trending / popular sorting
 
ResourceSchema.index({ upvoteCount: -1 });

export default mongoose.model("Resource", ResourceSchema);
