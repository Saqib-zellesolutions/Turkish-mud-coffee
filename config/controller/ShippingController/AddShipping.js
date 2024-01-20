const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const AddShipping = async (req, res) => {
  const branch = req.params.branch;
  const { value, delivery_charges } = req.body;
  if (!value) {
    return res.json({ message: "Required infos are missing" });
  }
  try {
    const data = { value, delivery_charges, branch };
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
    const ShippingModel = conn.model(`Shipping_${branch}`, require('../../models/ShippingSchema'));
    const addData = await ShippingModel.create(data);
    res.send({ message: "Successfully added Shipping ", addData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding the Shipping" });
  }
};
module.exports = AddShipping;
