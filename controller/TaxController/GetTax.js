const getTaxModel = require("../../models/TaxSchema");

const GetAllTax = async (req, res) => {
  const branch = req.params.branch;

  try {
    const Tax = getTaxModel(branch);
    const allTax = await Tax.find();
    res.json({ allTax });
  } catch (error) {
    console.error("Error fetching Tax:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetAllTax;
