const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    delivery_charges: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// const ShippingModel = mongoose.model("shipping", ShippingSchema);
// const getShippingModel = (branch) => {
//   return mongoose.model(`Shipping_${branch}`, ShippingSchema);
// };
module.exports = ShippingSchema;
