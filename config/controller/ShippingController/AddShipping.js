const getShippingModel = require("../../models/ShippingSchema");

const AddShipping = async (req, res) => {
  const branch = req.params.branch;
  const { value, delivery_charges } = req.body;
  if (!value) {
    return res.json({ message: "Required infos are missing" });
  }
  try {
    const data = { value, delivery_charges, branch };
    const Shipping = getShippingModel(branch);
    const addData = await Shipping.create(data);
    res.send({ message: "Successfully added Shipping ", addData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding the Shipping" });
  }
};
module.exports = AddShipping;
