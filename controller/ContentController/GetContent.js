const getContentModel = require("../../models/ContentSchema");
const ContentModel = require("../../models/ContentSchema");

const GetAllContent = async (req, res) => {
  const branch = req.params.branch;

  try {
    const Content = getContentModel(branch);
    const allContent = await Content.find();
    res.json({ allContent });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetAllContent;
