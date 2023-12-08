const GetOrderModel = require("../../models/OrderSchema");

const UpdateOrder = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const branch = req.params.branch;
  try {
    const OrderModel = GetOrderModel(branch);
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    } else {
      const updatedCategory = await OrderModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json({
        message: "Order updated successfully",
        updatedCategory,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err });
  }
};

module.exports = UpdateOrder;
