const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const DeleteSimpleProduct = async (req, res) => {
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
    const SimpleProductModel = conn.model(`simpleProduct_${branch}`, require('../../models/SimpleProductSchema'));
    const ProductModel = conn.model(`Product_${branch}`, require('../../models/ProductSchema'));
    const Simpleproduct = await SimpleProductModel.findById(id);
    await ProductModel.findById(id);
    if (!Simpleproduct) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      await SimpleProductModel.findByIdAndDelete(id);
      await ProductModel.findByIdAndDelete(id);
      res.json({ message: "Product deleted successfully", Simpleproduct });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

module.exports = DeleteSimpleProduct;
