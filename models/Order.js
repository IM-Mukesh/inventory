const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  type: { type: String, enum: ["purchase", "sales"] },
  parts: [
    {
      partId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Part",
        index: true,
      },
      quantity: Number,
      serialNumbers: [String],
    },
  ],
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
