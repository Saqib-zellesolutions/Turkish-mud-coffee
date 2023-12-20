const getSliderModel = require("../../models/SliderSchema");
const SliderModel = require("../../models/SliderSchema");
const DeleteSlider = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const deleteSlider = getSliderModel(branch);
    const Slider = await deleteSlider.findById(id);
    if (!Slider) {
      return res.status(404).json({ message: "Slider not found" });
    } else {
      await deleteSlider.findByIdAndDelete(id);
      res.json({ message: "Slider deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Slider", error: err });
  }
};

module.exports = DeleteSlider;
