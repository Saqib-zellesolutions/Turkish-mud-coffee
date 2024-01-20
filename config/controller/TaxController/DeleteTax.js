const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const DeleteTax = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
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
    const TaxModel = conn.model(`Tax_${branch}`, require('../../models/TaxSchema'));
    const Tax = await TaxModel.findById(id);
    if (!Tax) {
      return res.status(404).json({ message: "Tax not found" });
    } else {
      await TaxModel.findByIdAndDelete(id);
      res.json({ message: "Tax deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Tax", error: err });
  }
};

module.exports = DeleteTax;
