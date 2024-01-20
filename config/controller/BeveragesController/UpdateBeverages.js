
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const UpdateSimpleProduct = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  // Extract file paths from multer
  const newData = {
    ...req.body,
    images: req.files.map((file) => file.filename),
  };

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
    const BeveragesModel = conn.model(`Beverages_${branch}`, require('../../models/BeveragesSchema'));
    const product = await BeveragesModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      const updatedProduct = await BeveragesModel.findByIdAndUpdate(
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

module.exports = UpdateSimpleProduct;
