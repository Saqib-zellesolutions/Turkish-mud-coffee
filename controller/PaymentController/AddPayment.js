const getPaymentModel = require("../../models/PaymentSchema");

const AddPayment = async (req, res) => {
  const branch = req.params.branch;
  const { method, enable } = req.body;
  if (!method) {
    return res.json({ message: "Required infos are missing" });
  }
  try {
    const data = { method, enable };
    const Payment = getPaymentModel(branch);
    const addData = await Payment.create(data);
    res.send({ message: "Successfully added Payment ", addData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding the Payment" });
  }
};
module.exports = AddPayment;
