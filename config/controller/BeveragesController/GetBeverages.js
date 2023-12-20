const GetBeveragesModel = require("../../models/BeveragesSchema");
const BeveragesSchema = require("../../models/BeveragesSchema");

const getAllBeverages = async (req, res) => {
  const branch = req.params.branch;
  try {
    const Beverages = GetBeveragesModel(branch);
    const product = await Beverages.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err });
  }
};

module.exports = getAllBeverages;
