const getCategoryModel = require("../../models/CategorySchema");

const UpdateCategory = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;

  // Check if there are files in the request
  if (req.files) {
    // Handle image update using Multer
    try {
      // Assuming that you have separate fields for "image" and "banner_image"
      if (req.files.image) {
        newData.image = req.files.image[0].filename;
      }

      if (req.files.banner_image) {
        newData.banner_image = req.files.banner_image[0].filename;
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error handling file upload", error: err });
    }
  }

  try {
    const Category = getCategoryModel(branch);
    const product = await Category.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Category not found" });
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
