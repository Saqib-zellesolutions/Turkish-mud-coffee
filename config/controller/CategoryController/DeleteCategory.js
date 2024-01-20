const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const DeleteCategory = async (req, res) => {
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
    const CategoryModel = conn.model(`category_${branch}`, require('../../models/CategorySchema'));
    const ProductModel = conn.model(`simpleProduct_${branch}`, require('../../models/SimpleProductSchema'));
    const BeveragesModel = conn.model(`Beverages_${branch}`, require('../../models/BeveragesSchema'));
    const VariableModel = conn.model(`variableProduct_${branch}`, require('../../models/VariableProductSchema'));
    const category = await CategoryModel.findById(id);
    // const ProductModel = GetSimpleProductModel(branch)
    // const BeveragesModel = GetBeveragesModel(branch)
    // const VariableModel = GetVariableProductModel(branch)

    console.log(category.uniqueId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    } else {
      const parentId = category.uniqueId
      await CategoryModel.findByIdAndDelete(id);
      await ProductModel.deleteMany({ parent_id: parentId })
      await BeveragesModel.deleteMany({ parent_id: parentId })
      await VariableModel.deleteMany({ parent_id: parentId })
      res.json({ message: "Category deleted successfully", category });

    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Category", error: err });
  }
};

module.exports = DeleteCategory;
