// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const morgan = require("morgan");
// const ua = require("universal-analytics");
const path = require("path");
// Database Connection
const connectDB = require("./dbConnection");
const app = express();
// const visitor = ua("UA-XXXXXXXXX-X"); // Your UA Tracking ID

// Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(morgan("combined"));
require("dotenv").config();
connectDB();

// Track all API requests
app.use((req, res, next) => {
  visitor.pageview(req.originalUrl).send();
  next();
});

// Routes
app.use("/api/parts", require("./routes/partRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/uploads", require("./routes/uploadRoutes"));

// Static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
