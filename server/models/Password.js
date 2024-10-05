const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    service: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 300,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 300,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 500,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Password", passwordSchema);