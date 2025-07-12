const mongoose = require ("mongoose");

const helpRequestsSchema = new mongoose.Schema({
    topic: { type: String, required: true },
  details: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("helpRequests" ,helpRequestsSchema);