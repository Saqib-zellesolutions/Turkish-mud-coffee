const getSliderModel = require("../../models/SliderSchema");
const SliderModel = require("../../models/SliderSchema");

const GetSingleSlider = async (req, res) => {
  const SliderId = req.params.id;
  const branch = req.params.branch;
  try {
    const Slider = getSliderModel(branch);
    const SingleSlider = await Slider.findOne({ _id: SliderId });
    if (!SingleSlider) {
      return res.status(404).json({ message: "Slider not found" });
    }

    res.json({ SingleSlider });
  } catch (error) {
    console.error("Error fetching Slider:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleSlider;
