const GetAuthenticationModel = require("../../models/AuthenticaionSchema");

const GetAllUsers = async (req, res) => {
  const branch = req.params.branch;
  try {
    const UserModel = GetAuthenticationModel(branch);
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err });
  }
};

module.exports = GetAllUsers;
