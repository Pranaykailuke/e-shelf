const Book = require("../models/Book");

// Add New Book
const addBook = async (req, res) => {
    try {
        const { title, author, description, price, category, coverImage, stock } = req.body;

        const book = await Book.create({
            title,
            author,
            description,
            price,
            category,
            coverImage,
            stock
        });

        res.status(201).json({
            message: "Book added successfully",
            book
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Books
const getAllBooks = async (req, res) => {
    try {
        const keyword = req.query.search
            ? { title: { $regex: req.query.search, $options: "i" } }
            : {};

        const books = await Book.find(keyword);

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Book
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBook, getAllBooks, getBookById };