const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });


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
    const VariableModel = conn.model(`variableProduct_${branch}`, require('../../models/VariableProductSchema'));
    const product = await VariableModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await VariableModel.findByIdAndUpdate(
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
