const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
// const SliderModel = mongoose.model("Slider", SliderSchema);
const getSliderModel = (branch) => {
  return mongoose.model(`slider_${branch}`, SliderSchema);
};
module.exports = getSliderModel;
