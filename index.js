// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const CategoryRoute = require("./routes/CategoryRoute");
const SimpleProductRoute = require("./routes/SimpleProductRoute");
const VariableProductRoute = require("./routes/VariableProductRoute");
const ContentRoute = require("./routes/ContentRoute");
const SliderRoute = require("./routes/SliderRoute");
const TaxRoute = require("./routes/TaxRoute");
const ShippingRoute = require("./routes/ShippingRoute");
const BeveragesRoute = require("./routes/BeveragesRoute");
const PaymentRoute = require("./routes/PaymentRoute");
const AuthenticationRoute = require("./routes/AuthenticationRoute");
const OrderRoute = require("./routes/OrderRoute");
const connectToDatabase = require("./dbMiddlewear");
const app = express();

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("./uploads"));
// Middleware to connect to MongoDB based on branch connectToDatabase middlware

app.use("/api/v1/Category/:branch", connectToDatabase);
app.use("/api/v1/SimpleProduct/:branch", connectToDatabase);
app.use("/api/v1/VariableProduct/:branch", connectToDatabase);
app.use("/api/v1/Content/:branch", connectToDatabase);
app.use("/api/v1/Slider/:branch", connectToDatabase);
app.use("/api/v1/Tax/:branch", connectToDatabase);
app.use("/api/v1/Shipping/:branch", connectToDatabase);
app.use("/api/v1/Beverages/:branch", connectToDatabase);
app.use("/api/v1/Payment/:branch", connectToDatabase);
app.use("/api/v1/Authentication/:branch", connectToDatabase);
app.use("/api/v1/Order/:branch", connectToDatabase);

app.use("/api/v1/Category/:branch", CategoryRoute);
app.use("/api/v1/SimpleProduct/:branch", SimpleProductRoute);
app.use("/api/v1/VariableProduct/:branch", VariableProductRoute);
app.use("/api/v1/Content/:branch", ContentRoute);
app.use("/api/v1/Slider/:branch", SliderRoute);
app.use("/api/v1/Tax/:branch", TaxRoute);
app.use("/api/v1/Shipping/:branch", ShippingRoute);
app.use("/api/v1/Beverages/:branch", BeveragesRoute);
app.use("/api/v1/Payment/:branch", PaymentRoute);
app.use("/api/v1/Authentication/:branch", AuthenticationRoute);
app.use("/api/v1/Order/:branch", OrderRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
