const express = require("express");
const multer = require("multer");
const fs = require("fs");
const logger = require("../../helpers/logger");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../helpers/cloudinary");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    // Delete the temporary file from the server
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    logger.error(e);
    // Delete the temporary file on error as well
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Assest Id is required",
      });
    }

    await deleteMediaFromCloudinary(id);

    res.status(200).json({
      success: true,
      message: "Assest deleted successfully from cloudinary",
    });
  } catch (e) {
    logger.error(e);

    res.status(500).json({ success: false, message: "Error deleting file" });
  }
});

router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    const uploadPromises = req.files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.path)
    );

    const results = await Promise.all(uploadPromises);

    // Delete all temporary files after successful bulk upload
    req.files.forEach((fileItem) => {
      if (fs.existsSync(fileItem.path)) {
        fs.unlinkSync(fileItem.path);
      }
    });

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (event) {
    logger.error(event);

    // Delete files even if upload fails
    if (req.files) {
      req.files.forEach((fileItem) => {
        if (fs.existsSync(fileItem.path)) {
          fs.unlinkSync(fileItem.path);
        }
      });
    }

    res
      .status(500)
      .json({ success: false, message: "Error in bulk uploading files" });
  }
});

module.exports = router;
