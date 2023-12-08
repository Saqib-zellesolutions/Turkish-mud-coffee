const GetAuthenticationModel = require("../../models/AuthenticaionSchema");

const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const branch = req.params.branch;
  const newData = req.body;

  try {
    const UserModel = GetAuthenticationModel(branch);
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
