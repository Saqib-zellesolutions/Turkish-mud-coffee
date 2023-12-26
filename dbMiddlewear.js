// dbMiddleware.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const connectToDatabase = async (req, res, next) => {
  const branch = req.params.branch;
  const DBURI = process.env[`MONGODB_URL_BRANCH${branch.toUpperCase()}`]+'?retryWrites=true&w=majority';
  console.log(DBURI, "dbUrl");
  if (!DBURI) {
    console.error("DBURI is undefined. Check your environment variables.");
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  try {
    mongoose.disconnect()
    await mongoose.connect(DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 10000,
    });
    console.log(`Connected to database for branch: ${branch}`);
    next();
  } catch (error) {
    console.error("Error connecting to database:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = connectToDatabase;
