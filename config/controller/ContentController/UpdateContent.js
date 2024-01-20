const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const UpdateContent = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
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
    const updateContent = await ContentModel.findById(id);
    if (!updateContent) {
      return res.status(404).json({ message: "Content not found" });
    } else {
      const updatedContent = await ContentModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json({
        message: "Content updated successfully",
        updatedContent,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating content", error: err });
  }
};

module.exports = UpdateContent;
