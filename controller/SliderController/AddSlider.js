const getSliderModel = require("../../models/SliderSchema");

const AddSlider = async (req, res) => {
  const branch = req.params.branch;
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.json({ message: "Required infos are missing" });
  }
  try {
    const data = {
      title,
      description,
      image,
    };
    const slider = getSliderModel(branch);
    const addData = await slider.create(data);
    res.send({ message: "Successfully added Slidier ", addData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding the Slider" });
  }
};
module.exports = AddSlider;
