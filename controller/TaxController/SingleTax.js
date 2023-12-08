const getTaxModel = require("../../models/TaxSchema");

const GetSingleTax = async (req, res) => {
  const TaxId = req.params.id;
  const branch = req.params.branch;
  try {
    const Tax = getTaxModel(branch);
    const SingleTax = await Tax.findOne({ _id: TaxId });
    if (!SingleTax) {
      return res.status(404).json({ message: "Tax not found" });
    }

    res.json({ data: SingleTax });
  } catch (error) {
    console.error("Error fetching Tax:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleTax;
