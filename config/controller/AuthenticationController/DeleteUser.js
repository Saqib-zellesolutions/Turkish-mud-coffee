const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const DeleteUser = async (req, res) => {
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
    const UserModel = conn.model(`user_${branch}`, require('../../models/AuthenticaionSchema'));
    let user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      res.json({ message: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
};

module.exports = DeleteUser;
