const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const AddPayment = async (req, res) => {
  const branch = req.params.branch;
  const { method, enable } = req.body;
  if (!method) {
    return res.json({ message: "Required infos are missing" });
  }
  try {
    const data = { method, enable };
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
    const PaymenModel = conn.model(`Payment_${branch}`, require('../../models/PaymentSchema'));
    const addData = await PaymenModel.create(data);
    res.send({ message: "Successfully added Payment ", addData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding the Payment" });
  }
};
module.exports = AddPayment;
