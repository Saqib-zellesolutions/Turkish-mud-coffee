const GetSimpleProductModel = require("../../models/SimpleProductSchema");
const UpdateSimpleProduct = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  // Extract file paths from multer
  const newData = {
    ...req.body,
    images: req.files.map((file) => file.path.replace(/uploads\\/g, "")),
  };

  try {
    const simpleProduct = GetSimpleProductModel(branch);
    const product = await simpleProduct.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      const updatedProduct = await simpleProduct.findByIdAndUpdate(
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
