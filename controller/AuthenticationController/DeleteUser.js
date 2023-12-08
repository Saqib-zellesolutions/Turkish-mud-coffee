const GetAuthenticationModel = require("../../models/AuthenticaionSchema");

const DeleteUser = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  try {
    const UserModel = GetAuthenticationModel(branch);
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
