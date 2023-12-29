const getCategoryModel = require("../../models/CategorySchema");
const GetSimpleProductModel = require("../../models/SimpleProductSchema");
const GetVariableProductModel = require("../../models/VariableProductSchema");

const GetFilterProductByCategory = async (req, res) => {
  const branch = req.params.branch;
  const category = req.params.category;

  try {
    const Category = getCategoryModel(branch);
    const categories = await Category.find({ name: category });
    if (categories?.length) {
      const SimpleProduct = GetSimpleProductModel(branch);
      const product = SimpleProduct.find({ parent_id: categories[0].uniqueId });
      const VariableProduct = GetVariableProductModel(branch);
      const variableProduct = VariableProduct.find({
        parent_id: categories[0].uniqueId,
      });
      res.json({ product, variableProduct });
      return;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = GetFilterProductByCategory;
