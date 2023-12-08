const GetSimpleProductModel = require("../../models/SimpleProductSchema");
const SimpleProductSchema = require("../../models/SimpleProductSchema");
const DeleteSimpleProduct = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const simpleProduct = GetSimpleProductModel(branch);
    const product = await simpleProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      await simpleProduct.findByIdAndDelete(id);
      res.json({ message: "Product deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

module.exports = DeleteSimpleProduct;
