const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetSingleVariableProduct = async (req, res) => {
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
    const VariableModel = conn.model(`variableProduct_${branch}`, require('../../models/VariableProductSchema'));
    const Variable = await VariableModel.findOne({ _id: id });
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
