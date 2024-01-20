const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const GetAllContent = async (req, res) => {
  const branch = req.params.branch;

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
  try {
    const conn = await mongoose.createConnection(DBURI, { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, res) {
        try {
          console.log('Connected to Database');
        } catch (err) {
          console.log(err);
          throw err;
        }
      });
    const ContentModel = conn.model(`content_${branch}`, require('../../models/ContentSchema'));
    const allContent = await ContentModel.find();
    res.json({ allContent });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetAllContent;
