const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    service: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300,
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300,
    },
    strength: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 500,
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    bookmarked: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Password", passwordSchema);