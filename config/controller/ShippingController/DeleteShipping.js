const getShippingModel = require("../../models/ShippingSchema");
const ShippingModel = require("../../models/ShippingSchema");
const DeleteShipping = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const deleteShipping = getShippingModel(branch);
    const Shipping = await deleteShipping.findById(id);
    if (!Shipping) {
      return res.status(404).json({ message: "Shipping not found" });
    } else {
      await deleteShipping.findByIdAndDelete(id);
      res.json({ message: "Shipping deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Shipping", error: err });
  }
};

module.exports = DeleteShipping;
