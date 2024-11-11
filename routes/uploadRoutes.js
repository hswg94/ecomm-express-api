import path from "path";
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", uploadSingleImage, async (req, res) => {
  try {
    // Function to create an upload stream to Cloudinary
    const uploadStream = await cloudinary.v2.uploader.upload_stream({folder: "Rendora",}, (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Error uploading image to Cloudinary" });
        }
        if (result) {
          // Send the Cloudinary URL in the response
          res.status(200).send({
            message: "Image uploaded successfully",
            image: result.secure_url,
          });
        }
      }
    );
    // Upload the file to Cloudinary
    uploadStream.end(req.file.buffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
});

export default router;