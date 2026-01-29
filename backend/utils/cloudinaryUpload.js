import cloudinary from "../config/cloudinary.js";

export const uploadOnCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", 
        folder: "resources",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};


// in the following code snippets, the first one sets up multer middleware to handle PDF file uploads, 
// and the second one defines a utility function to upload PDF files to Cloudinary using their upload_stream method.
// The uploadPdfToCloudinary function takes a file buffer as input and uploads it to Cloudinary, returning 
// a promise that resolves with the upload result or rejects with an error.