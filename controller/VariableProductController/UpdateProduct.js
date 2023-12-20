const GetVariableProductModel = require("../../models/VariableProductSchema");

const UpdateVariableProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const branch = req.params.branch;
    const newData = req.body;
    const ParseVariation = JSON.parse(newData.variation);
    newData.variation = ParseVariation;

    if (req.files && req.files.images) {
      // Upload new images using Multer
      const newImages = req.files.images.map((file) => file.filename);
      // Update the images property for each variation
      newData.variation?.forEach((e) => {
        e.images = newImages;
      });
      newData.image = req.files.image[0].filename;
    } else {
      // Handle the case where images are not provided
      newData.variation?.forEach((e) => {
        e.images = [];
      });
      newData.image = req.files.image[0].filename;
    }
    newData.variation?.forEach((e) => console.log(e.images));
    console.log(newData, "bahar");

    const VariableProduct = GetVariableProductModel(branch);
    const product = await VariableProduct.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await VariableProduct.findByIdAndUpdate(
      id,
      {
        name: newData.name,
        description: newData.description,
        sku: newData.sku,
        image: newData.image,
        variation: newData.variation,
      },
      { new: true } // To get the updated document
    );

    return res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error updating product", error: err });
  }
};

module.exports = UpdateVariableProduct;
