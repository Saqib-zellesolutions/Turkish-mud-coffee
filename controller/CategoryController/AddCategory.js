const getCategoryModel = require("../../models/CategorySchema");
const { v4: uuidv4 } = require("uuid");

const AddCategory = async (req, res) => {
  const { name, image, banner_image } = req.body;
  const branch = req.params.branch;

  if (!name || !image || !banner_image) {
    return res.json({ message: "Required fields missing" });
  }

  try {
    const Category = getCategoryModel(branch);
    const data = {
      name,
      image: image,
      banner_image: banner_image,
      uniqueId: uuidv4(),
    };
    const newCategory = await Category.create(data);

    res.json({
      message: "Category added successfully",
      newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = AddCategory;
