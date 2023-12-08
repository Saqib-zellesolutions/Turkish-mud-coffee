const GetBeveragesModel = require("../../models/BeveragesSchema");
const UpdateBeverages = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;

  const newData = req.body;

  try {
    const Beverages = GetBeveragesModel(branch);
    const product = await Beverages.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      const updatedProduct = await Beverages.findByIdAndUpdate(
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

module.exports = UpdateBeverages;
