const getPaymentModel = require("../../models/PaymentSchema");

const GetAllPayment = async (req, res) => {
  const branch = req.params.branch;

  try {
    const Payment = getPaymentModel(branch);
    const allPayment = await Payment.find();
    res.json({ allPayment });
  } catch (error) {
    console.error("Error fetching Payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetAllPayment;
