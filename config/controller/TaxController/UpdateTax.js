const getTaxModel = require("../../models/TaxSchema");

const UpdateTax = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
  try {
    const Tax = getTaxModel(branch);
    const updateTax = await Tax.findById(id);
    if (!updateTax) {
      return res.status(404).json({ message: "Tax not found" });
    } else {
      const updatedTax = await Tax.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json({
        message: "Tax updated successfully",
        updatedTax,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating Tax", error: err });
  }
};

module.exports = UpdateTax;
