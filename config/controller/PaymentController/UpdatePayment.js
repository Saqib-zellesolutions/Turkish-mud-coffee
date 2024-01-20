const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const UpdatePayment = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
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

    const updatePayment = await PaymentModel.findById(id);
    if (!updatePayment) {
      return res.status(404).json({ message: "Payment not found" });
    } else {
      const updatedPayment = await PaymentModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json({
        message: "Payment updated successfully",
        updatedPayment,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating Payment", error: err });
  }
};

module.exports = UpdatePayment;
