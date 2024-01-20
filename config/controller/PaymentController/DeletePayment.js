const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const DeletePayment = async (req, res) => {
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
    const PaymenModel = conn.model(`Payment_${branch}`, require('../../models/PaymentSchema'));
    const Payment = await PaymenModel.findById(id);
    if (!Payment) {
      return res.status(404).json({ message: "Payment not found" });
    } else {
      await PaymenModel.findByIdAndDelete(id);
      res.json({ message: "Payment deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Payment", error: err });
  }
};

module.exports = DeletePayment;
