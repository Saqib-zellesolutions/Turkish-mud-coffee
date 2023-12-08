const getShippingModel = require("../../models/ShippingSchema");

const GetAllShipping = async (req, res) => {
  const branch = req.params.branch;

  try {
    const Shipping = getShippingModel(branch);
    const allShipping = await Shipping.find();
    res.json({ allShipping });
  } catch (error) {
    console.error("Error fetching Shipping:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetAllShipping;
