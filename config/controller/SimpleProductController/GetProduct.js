const GetSimpleProductModel = require("../../models/SimpleProductSchema");
const SimpleProductSchema = require("../../models/SimpleProductSchema");

const getAllSimpleProduct = async (req, res) => {
  const branch = req.params.branch;
  try {
    const simpleProduct = GetSimpleProductModel(branch);
    const product = await simpleProduct.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err });
  }
};

module.exports = getAllSimpleProduct;
