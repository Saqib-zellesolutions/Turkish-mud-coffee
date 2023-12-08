const mongoose = require("mongoose");

const TaxSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// const TaxModel = mongoose.model("tax", TaxSchema);
const getTaxModel = (branch) => {
  return mongoose.model(`Tax_${branch}`, TaxSchema);
};
module.exports = getTaxModel;
