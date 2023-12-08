const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    enable: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
const getPaymentModel = (branch) => {
  return mongoose.model(`Payment_${branch}`, PaymentSchema);
};
module.exports = getPaymentModel;
