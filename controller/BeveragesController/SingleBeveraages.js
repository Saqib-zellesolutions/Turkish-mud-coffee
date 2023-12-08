const GetBeveragesModel = require("../../models/BeveragesSchema");

const GetSingleBeverages = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const Beverages = GetBeveragesModel(branch);
    const simple = await Beverages.findOne({ _id: id });
    if (!simple) {
      return res.status(404).json({ message: "Beverages not found" });
    }

    res.json({ data: simple });
  } catch (error) {
    console.error("Error fetching Beverages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleBeverages;
