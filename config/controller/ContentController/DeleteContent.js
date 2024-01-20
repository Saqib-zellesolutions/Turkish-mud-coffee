const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const DeleteContent = async (req, res) => {
  const id = req.params.id;
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
    const Content = await ContentModel.findById(id);
    if (!Content) {
      return res.status(404).json({ message: "Content not found" });
    } else {
      await ContentModel.findByIdAndDelete(id);
      res.json({ message: "Content deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Content", error: err });
  }
};

module.exports = DeleteContent;
