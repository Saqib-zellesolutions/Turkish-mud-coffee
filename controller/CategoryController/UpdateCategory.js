const getCategoryModel = require("../../models/CategorySchema");
const CategoryModel = require("../../models/CategorySchema");

const UpdateCategory = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
  try {
    const Category = getCategoryModel(branch);
    const product = await Category.findById(id);
    if (!product) {
      return res.status(404).json({ message: "category not found" });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json({
        message: "Category updated successfully",
        updatedCategory,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating category", error: err });
  }
};

module.exports = UpdateCategory;
