const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const UpdateShipping = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
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
    const updateShipping = await ShippingModel.findById(id);
    if (!updateShipping) {
      return res.status(404).json({ message: "Shipping not found" });
    } else {
      const updatedShipping = await ShippingModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json({
        message: "Shipping updated successfully",
        updatedShipping,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating Shipping", error: err });
  }
};

module.exports = UpdateShipping;
