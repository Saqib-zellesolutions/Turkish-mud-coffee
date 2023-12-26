const getCategoryModel = require("../../models/CategorySchema");

const GetAllCategory = async (req, res) => {
  const branch = req.params.branch;

  try {
    const Category = getCategoryModel(branch);
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetAllCategory;
