const getContentModel = require("../../models/ContentSchema");
const ContentModel = require("../../models/ContentSchema");

const UpdateContent = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;
  try {
    const Content = getContentModel(branch);
    const updateContent = await Content.findById(id);
    if (!updateContent) {
      return res.status(404).json({ message: "Content not found" });
    } else {
      const updatedContent = await Content.findByIdAndUpdate(id, newData, {
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
