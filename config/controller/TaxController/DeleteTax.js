const getTaxModel = require("../../models/TaxSchema");
const TaxModel = require("../../models/TaxSchema");
const DeleteTax = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const deleteTax = getTaxModel(branch);
    const Tax = await deleteTax.findById(id);
    if (!Tax) {
      return res.status(404).json({ message: "Tax not found" });
    } else {
      await deleteTax.findByIdAndDelete(id);
      res.json({ message: "Tax deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Tax", error: err });
  }
};

module.exports = DeleteTax;
