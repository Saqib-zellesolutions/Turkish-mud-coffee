// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const CategoryRoute = require("./config/routes/CategoryRoute");
const SimpleProductRoute = require("./config/routes/SimpleProductRoute");
const VariableProductRoute = require("./config/routes/VariableProductRoute");
const ContentRoute = require("./config/routes/ContentRoute");
const SliderRoute = require("./config/routes/SliderRoute");
const TaxRoute = require("./config/routes/TaxRoute");
const ShippingRoute = require("./config/routes/ShippingRoute");
const BeveragesRoute = require("./config/routes/BeveragesRoute");
const PaymentRoute = require("./config/routes/PaymentRoute");
const AuthenticationRoute = require("./config/routes/AuthenticationRoute");
const OrderRoute = require("./config/routes/OrderRoute");
const FilterProductByCategoryRoute = require("./config/routes/FilterProductByCategoryRoute");
const CategoryWithProductRoute = require("./config/routes/CategoryWithProductRoute");
const connectToDatabase = require("./dbMiddlewear");
const http = require("http");
const socketIo = require("socket.io");
const app = express();

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("./uploads"));
// Middleware to connect to MongoDB based on branch connectToDatabase middlware
const server = http.createServer(app); // Create an http server
const io = socketIo(server, {
  cors: {
    origin: "*",
    // transports: ["polling"],
    // methods: ["GET", "POST"]
    credentials: true,
  },
});
const connectedSockets = {};
// app.use("/api/v1/Category/:branch", connectToDatabase);
// app.use("/api/v1/SimpleProduct/:branch", connectToDatabase);
// app.use("/api/v1/VariableProduct/:branch", connectToDatabase);
// app.use("/api/v1/Content/:branch", connectToDatabase);
// app.use("/api/v1/Slider/:branch", connectToDatabase);
// app.use("/api/v1/Tax/:branch", connectToDatabase);
// app.use("/api/v1/Shipping/:branch", connectToDatabase);
// app.use("/api/v1/Beverages/:branch", connectToDatabase);
// app.use("/api/v1/Payment/:branch", connectToDatabase);
// app.use("/api/v1/Authentication/:branch", connectToDatabase);
// app.use("/api/v1/Order/:branch", connectToDatabase);

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

// app.use("/api/v1/Order/:branch", OrderRoute);
app.use("/api/v1/Order/:branch", (req, res, next) => {
  // connectToDatabase(req, res, () => {
  // Pass the connected socket to the route
  req.io = io;
  next();
  // });
}, OrderRoute);
app.use("/api/v1/FilterProductByCategory/:branch", FilterProductByCategoryRoute);
app.use("/api/v1/CategoryWithProduct/:branch", CategoryWithProductRoute);
app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

// app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
server.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));

// Listen for socket connections
io.on("connection", (socket) => {
  // Store the connected socket
  connectedSockets[socket.id] = socket;
  console.log(`Socket connected: ${socket.id}`);

  // Listen for disconnect events
  socket.on("disconnect", () => {
    delete connectedSockets[socket.id];
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

module.exports = { app, server, io, connectedSockets }; 