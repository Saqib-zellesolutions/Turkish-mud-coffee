const getSliderModel = require("../../models/SliderSchema");

const AddSlider = async (req, res) => {
  const branch = req.params.branch;
  const { title, description } = req.body;
  if (!title || !description || !req.file || !req.file.filename) {
    return res.json({ message: "Required infos are missing" });
  }
  console.log(req.file, "he");
  try {
    const data = {
      title,
      description,
      image: req.file.filename,
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
