const getCategoryModel = require("../../models/CategorySchema");
const { v4: uuidv4 } = require("uuid");

const AddCategory = async (req, res) => {
  const { name } = req.body;
  const branch = req.params.branch;

  // Check if files are present in the request
  if (!req.files || !req.files.image || !req.files.banner_image) {
    return res.json({ message: "Image or banner image missing" });
  }

  try {
    const Category = getCategoryModel(branch);
    const data = {
      name,
      image: req.files.image[0].filename, // Use the filename provided by Multer
      banner_image: req.files.banner_image[0].filename, // Use the filename provided by Multer
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
