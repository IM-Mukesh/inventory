const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  location: String,
  capacity: Number,
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
