const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const UpdateOrder = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
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
    const OrderModel = conn.model(`Order_${branch}`, require('../../models/OrderSchema'));
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    } else {
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json({
        message: "Order updated successfully",
        updatedOrder,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err });
  }
};

module.exports = UpdateOrder;
