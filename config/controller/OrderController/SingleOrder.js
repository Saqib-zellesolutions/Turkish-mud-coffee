const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });
const GetSingleOrder = async (req, res) => {
  const branch = req.params.branch;
  const id = req.params.id;
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
    const order = await OrderModel.findById({ _id: id });
    if (!order) {
      res.status(400).json({
        message: "order not available",
      });
    } else {
      res.json(order);
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err });
  }
};

module.exports = GetSingleOrder;
