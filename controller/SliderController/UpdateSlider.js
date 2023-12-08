const getSliderModel = require("../../models/SliderSchema");
const SliderModel = require("../../models/SliderSchema");

const UpdateSlider = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
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
