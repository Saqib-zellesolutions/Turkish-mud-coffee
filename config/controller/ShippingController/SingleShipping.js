const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetSingleShipping = async (req, res) => {
  const ShippingId = req.params.id;
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
    const ShippingModel = conn.model(`Shipping_${branch}`, require('../../models/ShippingSchema'));
    const SingleShipping = await ShippingModel.findOne({ _id: ShippingId });
    if (!SingleShipping) {
      return res.status(404).json({ message: "Shipping not found" });
    }

    res.json({ data: SingleShipping });
  } catch (error) {
    console.error("Error fetching Shipping:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleShipping;
