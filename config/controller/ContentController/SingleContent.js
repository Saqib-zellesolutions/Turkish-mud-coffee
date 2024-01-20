const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetSingleContent = async (req, res) => {
  const ContentId = req.params.id;
  const branch = req.params.branch;
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
    const ContentModel = conn.model(`content_${branch}`, require('../../models/ContentSchema'));
    const SingleContent = await ContentModel.findOne({ _id: ContentId });
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
