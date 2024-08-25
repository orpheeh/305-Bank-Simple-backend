const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true, unique: true },
    userKey: { type: String, require: true, unique: true },
    balance: { type: Number, default: 0}
});

module.exports = mongoose.model("User", User);