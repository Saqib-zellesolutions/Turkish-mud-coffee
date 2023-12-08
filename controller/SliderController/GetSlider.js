const getSliderModel = require("../../models/SliderSchema");
const SliderModel = require("../../models/SliderSchema");

const GetAllSlider = async (req, res) => {
  const branch = req.params.branch;

  try {
    const Slider = getSliderModel(branch);
    const allSlider = await Slider.find();
    res.json({ allSlider });
  } catch (error) {
    console.error("Error fetching Slider:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetAllSlider;
