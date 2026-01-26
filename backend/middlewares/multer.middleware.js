import multer from "multer";
const storage = multer.memoryStorage();

const fileFilter = (req , file ,cb) => {
    if(file.mimetype != "application/pdf") {
        cb(new Error("Only PDF files are allowed"), false);
    } else {
        cb(null, true);
    }
};  


export const upload = multer({
    storage,
    fileFilter,
    limits: {
        filesize: 10 * 1024 * 1024, // 10 MB
    },
});