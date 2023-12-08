const getTaxModel = require("../../models/TaxSchema");

const AddTax = async (req, res) => {
  const branch = req.params.branch;
  const { value } = req.body;
  if (!value) {
    return res.json({ message: "Required infos are missing" });
  }
  try {
    const data = { value };
    const Tax = getTaxModel(branch);
    const addData = await Tax.create(data);
    res.send({ message: "Successfully added Slidier ", addData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred while adding the Tax" });
  }
};
module.exports = AddTax;
