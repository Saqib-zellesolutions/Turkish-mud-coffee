const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const AddContent = async (req, res) => {
  const branch = req.params.branch;
  const { heading, sub_heading } = req.body;
  if (!heading || !sub_heading) {
    return res.json({ message: "Required infos are missing" });
  } else {
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
    const data = { heading, sub_heading };
    const content = await ContentModel.create(data);
    res.json({
      message: "Content added successfully",
      content,
    });
  }
};
module.exports = AddContent;
