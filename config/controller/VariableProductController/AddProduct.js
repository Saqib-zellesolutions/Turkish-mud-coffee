const getCategoryModel = require("../../models/CategorySchema");
const GetVariableProductModel = require("../../models/VariableProductSchema");

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

  const category = await getCategoryModel(branch);
  const categoryVerfier = await category.findOne({ uniqueId: parent_id });
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
        const categoryName = categoryVerfier?.name
        const genertaeSku = categoryName.substring(0, 2).toUpperCase() + '-' + name.substring(0, 2).toUpperCase() + '-' + sku
        const variableProduct = GetVariableProductModel(branch);
        const newProduct = await variableProduct.create({
          name,
          description,
          sku: genertaeSku,
          parent_id,
          image: req.files.image[0].filename,
          variation: ParseVariation.map((product) => ({
            ...product,
            images: images,
          })),
          // variation: variation,
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
