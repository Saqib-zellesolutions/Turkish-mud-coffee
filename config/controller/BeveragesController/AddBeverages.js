const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });
const AddSimpleProduct = async (req, res) => {
  const images = req.files.map((file) => file.filename); // Replace double backslashes with forward slashes
  const { name, description, sku, price, instock } = req.body;
  const parent_id = req.params.parent_id;
  const branch = req.params.branch;

  if (
    !name ||
    !description ||
    !sku ||
    !parent_id ||
    !images ||
    !price ||
    instock === undefined
  ) {
    return res.json({ message: "Required infos are missing" });
  }
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
  const BeveragesModel = conn.model(`Beverages_${branch}`, require('../../models/BeveragesSchema'));
  const CategoryModel = conn.model(`category_${branch}`, require('../../models/CategorySchema'));
  // const category = await getCategoryModel(branch);
  const categoryVerifier = await CategoryModel.findOne({ uniqueId: parent_id });

  if (!categoryVerifier) {
    return res.json({ message: "Provide a valid category id" });
  }

  try {
    const categoryName = categoryVerifier?.name
    const genertaeSku = categoryName.substring(0, 2).toUpperCase() + '-' + name.substring(0, 2).toUpperCase() + '-' + sku
    const data = {
      name,
      description,
      sku: genertaeSku,
      parent_id,
      images: images,
      price,
      instock,
    };

    // const Beverages = GetBeveragesModel(branch);
    const addData = await BeveragesModel.create(data);

    res.send({ message: "Successfully added product data", addData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding the product" });
  }
};

module.exports = AddSimpleProduct;
