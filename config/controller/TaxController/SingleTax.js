const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetSingleTax = async (req, res) => {
  const TaxId = req.params.id;
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
    const SingleTax = await TaxModel.findOne({ _id: TaxId });
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
