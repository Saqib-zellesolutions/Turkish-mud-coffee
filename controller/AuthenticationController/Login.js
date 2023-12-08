const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const GetAuthenticationModel = require("../../models/AuthenticaionSchema");

const Login = async (req, res) => {
  const { email, password, branch } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const UserModel = GetAuthenticationModel(branch);
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    bcryptjs.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Password comparison error" });
      }

      if (!result) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      let obj = {
        username: user.username,
        email: user.email,
        userType: user.userType,
        token: token,
        branch: branch,
      };
      return res.status(200).json({
        message: "successfully login",
        data: obj,
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};

module.exports = Login;
