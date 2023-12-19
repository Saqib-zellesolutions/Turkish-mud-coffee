const getSliderModel = require("../../models/SliderSchema");

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
    const Slider = getSliderModel(branch);
    const updateSlider = await Slider.findById(id);
    if (!updateSlider) {
      return res.status(404).json({ message: "Slider not found" });
    } else {
      const updatedSlider = await Slider.findByIdAndUpdate(id, newData, {
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
