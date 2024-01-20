const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const UpdateSlider = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
  if (req.file) {
    // Handle image update using Multer
    try {
      // Assuming that you have separate fields for "image" and "banner_image"
      if (req.file.filename) {
        newData.image = req.file.filename;
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error handling file upload", error: err });
    }
  }
  try {
    const number = branch === "branch1"
      ? 1
      : branch === "branch2"
        ? 2
        : branch === "branch3"
          ? 3
          : branch === "branch4"
            ? 4
            : null;
    const DBURI = process.env[`MONGODB_URL_BRANCH${number}`] + '?retryWrites=true&w=majority';
    const conn = mongoose.createConnection(DBURI);
    const SliderModel = conn.model(`slider_${branch}`, require('../../models/SliderSchema'));
    const updateSlider = await SliderModel.findById(id);
    if (!updateSlider) {
      return res.status(404).json({ message: "Slider not found" });
    } else {
      const updatedSlider = await SliderModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json({
        message: "Slider updated successfully",
        updatedSlider,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating Slider", error: err });
  }
};

module.exports = UpdateSlider;
