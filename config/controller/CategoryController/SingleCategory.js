const getCategoryModel = require("../../models/CategorySchema");
const CategoryModel = require("../../models/CategorySchema");

const GetSingleCategory = async (req, res) => {
  const categoryId = req.params.id;
  const branch = req.params.branch;
  try {
    const Category = getCategoryModel(branch);
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleCategory;
