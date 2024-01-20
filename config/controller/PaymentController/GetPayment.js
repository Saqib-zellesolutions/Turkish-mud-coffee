const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetAllPayment = async (req, res) => {
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
    const PaymentModel = conn.model(`Payment_${branch}`, require('../../models/PaymentSchema'));

    const allPayment = await PaymentModel.find();
    res.json({ allPayment });
  } catch (error) {
    console.error("Error fetching Payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetAllPayment;
