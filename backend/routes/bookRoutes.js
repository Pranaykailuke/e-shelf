const express = require("express");
const router = express.Router();
const { addBook, getAllBooks, getBookById, deleteBook } = require("../controllers/bookController");
const protect = require("../middleware/authMiddleware");

// Get All Books (Public)
router.get("/", getAllBooks);

// Get Single Book (Public)
router.get("/:id", getBookById);

// Add Book (Protected)
router.post("/", protect, addBook);

// Delete Book (Protected)
router.delete("/:id", protect, deleteBook);

module.exports = router;