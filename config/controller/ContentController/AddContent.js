const getContentModel = require("../../models/ContentSchema");
const ContentSchema = require("../../models/ContentSchema");
const AddContent = async (req, res) => {
  const branch = req.params.branch;
  const { heading, sub_heading } = req.body;
  if (!heading || !sub_heading) {
    return res.json({ message: "Required infos are missing" });
  } else {
    const ContentModel = getContentModel(branch);
    const data = { heading, sub_heading };
    const content = await ContentModel.create(data);
    res.json({
      message: "Content added successfully",
      content,
    });
  }
};
module.exports = AddContent;
