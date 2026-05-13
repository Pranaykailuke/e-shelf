const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: "default-book.jpg"
    },
    stock: {
        type: Number,
        default: 10
    }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);