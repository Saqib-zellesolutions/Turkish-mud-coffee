const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    banner_image: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    for: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const getCategoryModel = (branch) => {
  return mongoose.model(`category_${branch}`, CategorySchema);
};

module.exports = CategorySchema;
