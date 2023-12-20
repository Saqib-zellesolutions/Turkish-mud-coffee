const GetSimpleProductModel = require("../../models/SimpleProductSchema");

const GetSingleSimpleProduct = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const simpleProduct = GetSimpleProductModel(branch);
    const simple = await simpleProduct.findOne({ _id: id });
    if (!simple) {
      return res.status(404).json({ message: "SimpleProduct not found" });
    }

    res.json({ data: simple });
  } catch (error) {
    console.error("Error fetching simpleProduct:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleSimpleProduct;
