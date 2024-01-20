const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetFilterProductByCategory = async (req, res) => {
  const branch = req.params.branch;
  const name = req.params.name;

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
    const categories = await CategoryModel.findOne({ name });
    // res.json({ categories });
    let uniqueId = categories?.uniqueId;
    console.log(uniqueId);
    // const SimpleProduct = GetSimpleProductModel(branch);
    const simpleProduct = await ProductModel.find({ parent_id: uniqueId });
    // const VariableProduct = GetVariableProductModel(branch);
    const variableProduct = await VariableModel.find({
      parent_id: uniqueId,
    });
    const products = simpleProduct.concat(variableProduct);
    res.status(200).json({ products });
    //   return;
    // }
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = GetFilterProductByCategory;
