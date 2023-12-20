const mongoose = require("mongoose");

const VariableProductSchema = new mongoose.Schema(
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
    image: {
      type: String,
      require: true,
    },
    variation: [
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
        price: {
          type: String,
          require: true,
        },
        images: [
          {
            type: String,
          },
        ],
        instock: {
          type: Boolean,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);
// const VariableProductModel = mongoose.model(
//   "VariableProduct",
//   VariableProductSchema
// );
const GetVariableProductModel = (branch) => {
  return mongoose.model(`variableProduct_${branch}`, VariableProductSchema);
};
module.exports = GetVariableProductModel;
