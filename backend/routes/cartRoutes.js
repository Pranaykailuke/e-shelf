const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// ADD TO CART
router.post("/add", async (req, res) => {
  try {
    const item = await Cart.create(req.body);
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// GET CART ITEMS
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/remove/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;