const GetVariableProductModel = require("../../models/VariableProductSchema");
const UpdateVariableProduct = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;

  try {
    const VariableProduct = GetVariableProductModel(branch);
    const product = await VariableProduct.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      const updatedProduct = await VariableProduct.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );

      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err });
  }
};

module.exports = UpdateVariableProduct;
