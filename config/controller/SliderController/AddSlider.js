const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

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
    const addData = await SliderModel.create(data);
    res.send({ message: "Successfully added Slidier ", addData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding the Slider" });
  }
};
module.exports = AddSlider;
