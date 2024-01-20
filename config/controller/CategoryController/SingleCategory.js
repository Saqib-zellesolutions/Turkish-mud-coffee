const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetSingleCategory = async (req, res) => {
  const categoryId = req.params.id;
  const branch = req.params.branch;
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
    const category = await CategoryModel.findOne({ _id: categoryId });
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
