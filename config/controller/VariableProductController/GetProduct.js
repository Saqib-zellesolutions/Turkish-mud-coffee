const GetVariableProductModel = require("../../models/VariableProductSchema");

const GetAllVariableProduct = async (req, res) => {
  const branch = req.params.branch;
  try {
    const variableProduct = GetVariableProductModel(branch);
    const product = await variableProduct.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err });
  }
};

module.exports = GetAllVariableProduct;
