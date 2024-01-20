const bcryptjs = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });
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
