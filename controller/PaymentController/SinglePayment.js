const getPaymentModel = require("../../models/PaymentSchema");

const GetSinglePayment = async (req, res) => {
  const PaymentId = req.params.id;
  const branch = req.params.branch;
  try {
    const Payment = getPaymentModel(branch);
    const SinglePayment = await Payment.findOne({ _id: PaymentId });
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
