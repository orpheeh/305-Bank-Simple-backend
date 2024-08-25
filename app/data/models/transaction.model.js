const mongoose = require("mongoose");

const Transaction = new mongoose.Schema({
    amount: { type: Number },
    type: { type: String, enum: ["ADD", "REMOVE", "TRANSFER"] },
    destinataire: { type: String },
    destinataireDetail: { type: String },
    name: { type: String },
    user: { type: String }, // Email
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", Transaction);