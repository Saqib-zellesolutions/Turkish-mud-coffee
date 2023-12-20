const getPaymentModel = require("../../models/PaymentSchema");

const UpdatePayment = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
  try {
    const Payment = getPaymentModel(branch);
    const updatePayment = await Payment.findById(id);
    if (!updatePayment) {
      return res.status(404).json({ message: "Payment not found" });
    } else {
      const updatedPayment = await Payment.findByIdAndUpdate(id, newData, {
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
