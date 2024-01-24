const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
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
const GetProductModel = (branch) => {
  return mongoose.model(`Product_${branch}`, ProductSchema);
};
module.exports = ProductSchema;
