const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 500,
    },
});

module.exports = mongoose.model("User", userSchema);