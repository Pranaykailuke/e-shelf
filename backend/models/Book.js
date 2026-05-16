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
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 10
    }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);