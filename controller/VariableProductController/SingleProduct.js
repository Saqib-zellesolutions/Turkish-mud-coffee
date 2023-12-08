const GetVariableProductModel = require("../../models/VariableProductSchema");

const GetSingleVariableProduct = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const VariableProduct = GetVariableProductModel(branch);
    const Variable = await VariableProduct.findOne({ _id: id });
    if (!Variable) {
      return res.status(404).json({ message: "VariableProduct not found" });
    }

    res.json({ data: Variable });
  } catch (error) {
    console.error("Error fetching VariableProduct:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleVariableProduct;
