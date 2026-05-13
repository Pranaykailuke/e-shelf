const Cart = require("../models/Cart");

// Get Cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.book");

        if (!cart) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add To Cart
const addToCart = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [{ book: bookId, quantity }]
            });
        } else {
            const itemIndex = cart.items.findIndex(
                item => item.book.toString() === bookId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ book: bookId, quantity });
            }

            await cart.save();
        }

        res.status(200).json({
            message: "Book added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove From Cart
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.book.toString() !== req.params.bookId
        );

        await cart.save();

        res.status(200).json({
            message: "Book removed from cart",
            cart
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCart, addToCart, removeFromCart };