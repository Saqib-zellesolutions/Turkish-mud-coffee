const { default: mongoose, Types } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const AddVariableProduct = async (req, res) => {
  const { name, description, sku, variation } = req.body;
  const parent_id = req.params.parent_id;
  const branch = req.params.branch;
  const images = req.files.images.map((file) => file.filename);
  let ParseVariation = JSON.parse(variation);
  if (
    !name ||
    !description ||
    !sku ||
    !parent_id ||
    !req.files.image ||
    !ParseVariation?.length
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
  const CategoryModel = conn.model(`category_${branch}`, require('../../models/CategorySchema'));
  const categoryVerfier = await CategoryModel.findOne({ uniqueId: parent_id });
  if (!categoryVerfier) {
    return res.json({ message: "Provide a valid category id" });
  } else {
    const categoryName = categoryVerfier?.name
    const required = ParseVariation.map((item, index) => {
      if (
        !item.name ||
        !item.description ||
        !item.sku ||
        !item.price ||
        item.instock === undefined
      ) {
        return false;
      } else {
        item.sku = categoryName.substring(0, 2).toUpperCase() + '-' + item?.name.substring(0, 2).toUpperCase() + '-' + sku + '-' + `${index + 1}`;
        return true;
      }
    });

    const error = required.includes(false);

    if (error) {
      return res.json({ message: "Missing Product Variation" });
    } else {
      try {
        const sharedId = new Types.ObjectId();
        const categoryName = categoryVerfier?.name
        const genertaeSku = categoryName.substring(0, 2).toUpperCase() + '-' + name.substring(0, 2).toUpperCase() + '-' + sku
        // const variableProduct = GetVariableProductModel(branch);
        const VariableModel = conn.model(`variableProduct_${branch}`, require('../../models/VariableProductSchema'));
        const ProductModel = conn.model(`Product_${branch}`, require('../../models/ProductSchema'));
        const productVariations = await Promise.all(ParseVariation?.map(async (product) => {
          const newProduct = await ProductModel.create({
            ...product,
            images: images,
          });
          return newProduct;  // Get the _id of each variation and store in an array
        }));
        const newProduct = await VariableModel.create({
          name,
          description,
          sku: genertaeSku,
          parent_id,
          image: req.files.image[0].filename,
          // variation: ParseVariation.map((product) => ({
          //   _id: sharedId,
          //   ...product,
          //   images: images,
          // })),
          variation: productVariations,
        });
        res.json({
          message: "Product added successfully",
          data: newProduct,
        });
        // );
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
};

module.exports = AddVariableProduct;
