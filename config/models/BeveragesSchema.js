const mongoose = require("mongoose");

const BeveragesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    sku: {
      type: String,
      require: true,
    },
    parent_id: {
      type: String,
      require: true,
    },
    images: [
      {
        type: String,
      },
    ],
    price: {
      type: String,
      require: true,
    },
    salePrice: {
      type: String,
    },
    instock: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
// const BeveragesModel = mongoose.model("Beverages", BeveragesSchema);
const GetBeveragesModel = (branch) => {
  return mongoose.model(`Beverages_${branch}`, BeveragesSchema);
};
module.exports = BeveragesSchema;
