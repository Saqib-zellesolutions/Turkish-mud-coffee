const mongoose = require("mongoose");

const SimpleProductSchema = new mongoose.Schema(
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
    instock: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
// const SimpleProductModel = mongoose.model("SimpleProduct", SimpleProductSchema);
const GetSimpleProductModel = (branch) => {
  return mongoose.model(`simpleProduct_${branch}`, SimpleProductSchema);
};
module.exports = SimpleProductSchema;
