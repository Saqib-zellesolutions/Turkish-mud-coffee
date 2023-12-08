const getCategoryModel = require("../../models/CategorySchema");
const CategoryModel = require("../../models/CategorySchema");
const GetVariableProductModel = require("../../models/VariableProductSchema");

const AddVariableProduct = async (req, res) => {
  const { name, description, sku, image, variation } = req.body;
  const parent_id = req.params.parent_id;
  const branch = req.params.branch;
  if (
    !name ||
    !description ||
    !sku ||
    !parent_id ||
    !image ||
    !variation?.length
  ) {
    return res.json({ message: "Required infos are missing" });
  }

  const category = await getCategoryModel(branch);
  const categoryVerfier = await category.findOne({ uniqueId: parent_id });

  if (!categoryVerfier) {
    return res.json({ message: "Provide a valid category id" });
  } else {
    const required = variation.map((item) => {
      if (
        !item.name ||
        !item.description ||
        !item.sku ||
        !item.price ||
        !item.images.length ||
        item.instock === undefined
      ) {
        return false;
      } else {
        return true;
      }
    });

    const error = required.includes(false);

    if (error) {
      return res.json({ message: "Missing Product Variation" });
    } else {
      try {
        const variableProduct = GetVariableProductModel(branch);
        const newProduct = await variableProduct.create({
          name,
          description,
          sku,
          parent_id,
          image: image,
          variation: variation,
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
