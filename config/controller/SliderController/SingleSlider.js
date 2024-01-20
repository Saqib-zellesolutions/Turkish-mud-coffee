const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetSingleSlider = async (req, res) => {
  const SliderId = req.params.id;
  const branch = req.params.branch;
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
    const SingleSlider = await SliderModel.findOne({ _id: SliderId });
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
