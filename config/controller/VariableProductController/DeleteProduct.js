const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const DeleteVariableProduct = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;

  try {
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
    const VariableModel = conn.model(`variableProduct_${branch}`, require('../../models/VariableProductSchema'));
    const ProductModel = conn.model(`Product_${branch}`, require('../../models/ProductSchema'));

    // Find the variable product and its variations
    const product = await VariableModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the variable product
    await VariableModel.findByIdAndDelete(id);

    // Delete each variation in the ProductModel
    await Promise.all(product.variation.map(async (variationId) => {
      await ProductModel.findByIdAndDelete(variationId);
    }));

    res.json({ message: "Product and variations deleted successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

module.exports = DeleteVariableProduct;
