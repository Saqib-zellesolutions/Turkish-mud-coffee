const GetVariableProductModel = require("../../models/VariableProductSchema");
const VariableProductSchema = require("../../models/VariableProductSchema");
const DeleteVariableProduct = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const VariableProduct = GetVariableProductModel(branch);
    const product = await VariableProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      await VariableProduct.findByIdAndDelete(id);
      res.json({ message: "Product deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

module.exports = DeleteVariableProduct;
