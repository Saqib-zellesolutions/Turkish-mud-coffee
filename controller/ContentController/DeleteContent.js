const getContentModel = require("../../models/ContentSchema");
const ContentModel = require("../../models/ContentSchema");
const DeleteContent = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const deleteContent = getContentModel(branch);
    const Content = await deleteContent.findById(id);
    if (!Content) {
      return res.status(404).json({ message: "Content not found" });
    } else {
      await deleteContent.findByIdAndDelete(id);
      res.json({ message: "Content deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting Content", error: err });
  }
};

module.exports = DeleteContent;
