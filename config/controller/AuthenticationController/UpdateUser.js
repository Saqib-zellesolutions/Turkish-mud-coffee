const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const UpdateUser = async (req, res) => {
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
    const UserModel = conn.model(`user_${branch}`, require('../../models/AuthenticaionSchema'));
    // const UserModel = GetAuthenticationModel(branch);
    const updatedUser = await UserModel.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
};

module.exports = UpdateUser;
