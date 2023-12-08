const GetOrderModel = require("../../models/OrderSchema");

const GetAllOrder = async (req, res) => {
  const branch = req.params.branch;
  try {
    const OrderModel = GetOrderModel(branch);
    const order = await OrderModel.find();
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

module.exports = GetAllOrder;
