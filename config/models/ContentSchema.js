const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    sub_heading: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const getContentModel = (branch) => {
  return mongoose.model(`content_${branch}`, ContentSchema);
};
// const ContentModel = mongoose.model("content", ContentSchema);
module.exports = ContentSchema;
