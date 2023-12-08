const getCategoryModel = require("../../models/CategorySchema");
const CategoryModel = require("../../models/CategorySchema");
const DeleteCategory = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const deleteCategory = getCategoryModel(branch);
    const category = await deleteCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    } else {
      await deleteCategory.findByIdAndDelete(id);
      res.json({ message: "Category deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Category", error: err });
  }
};

module.exports = DeleteCategory;
