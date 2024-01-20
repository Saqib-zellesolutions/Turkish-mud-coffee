const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });
const { v4: uuidv4 } = require("uuid");

const AddCategory = async (req, res) => {
  const { name ,For} = req.body;
  const branch = req.params.branch;

  // Check if files are present in the request
  if (!req.files || !req.files.image || !req.files.banner_image||!For) {
    return res.json({ message: "Image or banner image missing" });
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
    const data = {
      name,
      image: req.files.image[0].filename, // Use the filename provided by Multer
      banner_image: req.files.banner_image[0].filename, // Use the filename provided by Multer
      uniqueId: uuidv4(),
      for:For
    };
    const newCategory = await CategoryModel.create(data);

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
