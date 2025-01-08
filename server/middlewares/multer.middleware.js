// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// import path from "path"
// import multer from "multer"

// const upload = multer({
//     dest:"uploads/",
//     limits:{fileSize: 50 * 1024 * 1024}, /* 50mb max size */
//     storage:multer.diskStorage({
//         destination:"uploads/",
//         filename: (_req, file, cb)=>{
//            cb(null, file.originalname)
//         },
//     }),
//     fileFilter:(_req, file, cb)=>{
//         let ext = path.extname(file.originalname)

//         if(ext !==".jpg" &&
//            ext !==".jpeg" &&
//            ext !==".webp" &&
//            ext !==".png" &&
//            ext !==".mp4" 
//         ){
//             // calback
//             cb(new Error(`Unsupported file type! ${ext}`), false)
//             return
//         }
//         cb(null, true)
            
//     }
// })
// export default upload


// Multer is a Node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
import path from "path";
import multer from "multer";
import fs from "fs";

// Set the upload path based on the environment
const uploadPath =
  process.env.NODE_ENV === "production" ? "/tmp/uploads" : "./uploads";

// Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer
const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB max size
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
      cb(null, file.originalname); // Save files with their original name
    },
  }),
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // Check for supported file types
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      cb(new Error(`Unsupported file type: ${ext}`), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
