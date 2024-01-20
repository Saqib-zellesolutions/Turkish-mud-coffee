const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetSingleSimpleProduct = async (req, res) => {
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
    const ProductModel = conn.model(`simpleProduct_${branch}`, require('../../models/SimpleProductSchema'));
    const simple = await ProductModel.findOne({ _id: id });
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
