const getCategoryModel = require("../../models/CategorySchema");
const GetSimpleProductModel = require("../../models/SimpleProductSchema");
const GetVariableProductModel = require("../../models/VariableProductSchema");

const GetFilterProductByCategory = async (req, res) => {
  const branch = req.params.branch;
  const name = req.params.name;

  try {
    const Category = getCategoryModel(branch);
    const categories = await Category.findOne({ name });
    // res.json({ categories });
    let uniqueId = categories?.uniqueId;
    console.log(uniqueId);
    const SimpleProduct = GetSimpleProductModel(branch);
    const simpleProduct = await SimpleProduct.find({ parent_id: uniqueId });
    const VariableProduct = GetVariableProductModel(branch);
    const variableProduct = await VariableProduct.find({
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
