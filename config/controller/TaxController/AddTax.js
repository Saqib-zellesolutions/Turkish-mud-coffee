const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const AddTax = async (req, res) => {
  const branch = req.params.branch;
  const { value } = req.body;
  if (!value) {
    return res.json({ message: "Required infos are missing" });
  }
  try {
    const data = { value };
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
    const addData = await TaxModel.create(data);
    res.send({ message: "Successfully added Slidier ", addData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred while adding the Tax" });
  }
};
module.exports = AddTax;
