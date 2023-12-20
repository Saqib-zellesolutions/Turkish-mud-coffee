const getPaymentModel = require("../../models/PaymentSchema");
const DeletePayment = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const deletePayment = getPaymentModel(branch);
    const Payment = await deletePayment.findById(id);
    if (!Payment) {
      return res.status(404).json({ message: "Payment not found" });
    } else {
      await deletePayment.findByIdAndDelete(id);
      res.json({ message: "Payment deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Payment", error: err });
  }
};

module.exports = DeletePayment;
