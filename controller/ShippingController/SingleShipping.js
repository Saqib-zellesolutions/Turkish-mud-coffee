const getShippingModel = require("../../models/ShippingSchema");

const GetSingleShipping = async (req, res) => {
  const ShippingId = req.params.id;
  const branch = req.params.branch;
  try {
    const Shipping = getShippingModel(branch);
    const SingleShipping = await Shipping.findOne({ _id: ShippingId });
    if (!SingleShipping) {
      return res.status(404).json({ message: "Shipping not found" });
    }

    res.json({ data: SingleShipping });
  } catch (error) {
    console.error("Error fetching Shipping:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleShipping;
