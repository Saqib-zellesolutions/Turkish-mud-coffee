
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetSingleBeverages = async (req, res) => {
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
    const BeveragesModel = conn.model(`Beverages_${branch}`, require('../../models/BeveragesSchema'));
    const simple = await BeveragesModel.findOne({ _id: id });
    if (!simple) {
      return res.status(404).json({ message: "Beverages not found" });
    }

    res.json({ data: simple });
  } catch (error) {
    console.error("Error fetching Beverages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleBeverages;
