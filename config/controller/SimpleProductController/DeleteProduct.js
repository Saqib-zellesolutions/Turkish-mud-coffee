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
    const ProductModel = conn.model(`simpleProduct_${branch}`, require('../../models/SimpleProductSchema'));
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      await ProductModel.findByIdAndDelete(id);
      res.json({ message: "Product deleted successfully", product });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

module.exports = DeleteSimpleProduct;
