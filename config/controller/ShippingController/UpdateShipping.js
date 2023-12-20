const getShippingModel = require("../../models/ShippingSchema");

const UpdateShipping = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
  try {
    const Shipping = getShippingModel(branch);
    const updateShipping = await Shipping.findById(id);
    if (!updateShipping) {
      return res.status(404).json({ message: "Shipping not found" });
    } else {
      const updatedShipping = await Shipping.findByIdAndUpdate(id, newData, {
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
