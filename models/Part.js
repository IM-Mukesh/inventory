const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  name: String,
  description: String,
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", index: true },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    index: true,
  },
  quantity: Number,
  serialNumbers: [String],
  photo: String, // To store the photo file path or URL
});

module.exports = mongoose.model("Part", partSchema);
