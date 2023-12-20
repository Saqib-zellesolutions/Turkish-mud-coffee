const GetOrderModel = require("../../models/OrderSchema");

const DeleteOrder = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const OrderModel = GetOrderModel(branch);
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      await OrderModel.findByIdAndDelete(id);
      res.json({ message: "Order deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

module.exports = DeleteOrder;
