const mongoose = require("mongoose");
const connectToDatabase = require("../../dbMiddlewear");

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
const GetAuthenticationModel = async(branch) => {
  const conn = await connectToDatabase(branch);
    const UserModel = conn.model(`user_${branch}`, AuthenticationSchema);

  // return mongoose.model(`user_${branch}`, AuthenticationSchema);
  return UserModel;
};
// const UserModel = mongoose.model("user", UserSchema);
module.exports = AuthenticationSchema;
// module.exports = GetAuthenticationModel;
