import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Set the destination folder where uploaded files will be stored.
    callback(null, "./backend/uploads");
  },
  filename: (req, file, callback) => {
    // Set the filename for the uploaded file.
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
