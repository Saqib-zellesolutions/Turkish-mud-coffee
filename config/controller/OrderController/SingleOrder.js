const GetOrderModel = require("../../models/OrderSchema");

const GetSingleOrder = async (req, res) => {
  const branch = req.params.branch;
  const id = req.params.id;
  try {
    const OrderModel = GetOrderModel(branch);
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
