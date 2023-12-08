const GetBeveragesModel = require("../../models/BeveragesSchema")
const DeleteBeverages = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const Beverages = GetBeveragesModel(branch);
    const product = await Beverages.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      await Beverages.findByIdAndDelete(id);
      res.json({ message: "Product deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

module.exports = DeleteBeverages;
