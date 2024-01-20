
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

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
    const product = await CategoryModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Category not found" });
    } else {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(id, newData, {
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
