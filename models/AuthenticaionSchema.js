const mongoose = require("mongoose");

const AuthenticationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    userType: {
      type: String,
      default: "user",
    },
    branch: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const GetAuthenticationModel = (branch) => {
  return mongoose.model(`user_${branch}`, AuthenticationSchema);
};
// const UserModel = mongoose.model("user", UserSchema);
module.exports = GetAuthenticationModel;
