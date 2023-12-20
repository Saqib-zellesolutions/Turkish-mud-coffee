const getCategoryModel = require("../../models/CategorySchema");
const GetSimpleProductModel = require("../../models/SimpleProductSchema");
const AddSimpleProduct = async (req, res) => {
  const images = req.files.map((file) => file.filename);
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

  const category = await getCategoryModel(branch);
  const categoryVerifier = await category.findOne({ uniqueId: parent_id });

  if (!categoryVerifier) {
    return res.json({ message: "Provide a valid category id" });
  }

  try {
    const data = {
      name,
      description,
      sku,
      parent_id,
      images: images,
      price,
      instock,
    };

    const simpleProduct = GetSimpleProductModel(branch);
    const addData = await simpleProduct.create(data);

    res.send({ message: "Successfully added product data", addData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding the product" });
  }
};

module.exports = AddSimpleProduct;
