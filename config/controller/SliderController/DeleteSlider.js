const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const DeleteSlider = async (req, res) => {
  const id = req.params.id;
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
    const Slider = await SliderModel.findById(id);
    if (!Slider) {
      return res.status(404).json({ message: "Slider not found" });
    } else {
      await SliderModel.findByIdAndDelete(id);
      res.json({ message: "Slider deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Slider", error: err });
  }
};

module.exports = DeleteSlider;
