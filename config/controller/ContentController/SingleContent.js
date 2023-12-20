const getContentModel = require("../../models/ContentSchema");
const ContentModel = require("../../models/ContentSchema");

const GetSingleContent = async (req, res) => {
  const ContentId = req.params.id;
  const branch = req.params.branch;
  try {
    const Content = getContentModel(branch);
    const SingleContent = await Content.findOne({ _id: ContentId });
    if (!SingleContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json({ SingleContent });
  } catch (error) {
    console.error("Error fetching Content:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetSingleContent;
