const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetSinglePayment = async (req, res) => {
  const PaymentId = req.params.id;
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
    const SinglePayment = await PaymentModel.findOne({ _id: PaymentId });
    if (!SinglePayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({ data: SinglePayment });
  } catch (error) {
    console.error("Error fetching Payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSinglePayment;
