const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const DeleteShipping = async (req, res) => {
  const id = req.params.id;
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
    const Shipping = await ShippingModel.findById(id);
    if (!Shipping) {
      return res.status(404).json({ message: "Shipping not found" });
    } else {
      await ShippingModel.findByIdAndDelete(id);
      res.json({ message: "Shipping deleted successfully", Shipping });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Shipping", error: err });
  }
};

module.exports = DeleteShipping;
