const bcryptjs = require("bcryptjs");
const GetAuthenticationModel = require("../../models/AuthenticaionSchema");
const Signup = async (req, res) => {
  const { username, email, password, confirmpassword, branch } = req.body;
  if ((!username, !email, !password, !confirmpassword)) {
    return res.json({ message: "Required field are missing" });
  } else if (password != confirmpassword) {
    return res
      .status(400)
      .send({ status: 400, message: "not match the password" });
  } else {
    const hashPassword = await bcryptjs.hash(password, 10);
    const userObj = {
      ...req.body,
      password: hashPassword,
      branch: branch,
    };
    try {
      const UserModel = GetAuthenticationModel(branch);
      const existingUsers = await UserModel.find({ email });

      if (existingUsers.length > 0) {
        res.send({ message: "User already exists" });
      } else {
        const user = await UserModel.create(userObj);
        res.send({ message: "User successfully signed up", user });
      }
    } catch (err) {
      res.send(err);
    }
  }
};
module.exports = Signup;
