const Wishlist = require('../models/Wishlist');


const getWishlist = async (req, res) => {
    try {
        const list = await Wishlist.find();
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Add movie to wishlist
// @route   POST /api/wishlist
const addToWishlist = async (req, res) => {
    const { movieId, title, poster, rating, year } = req.body;
    
    try {
        // Check if already exists
        const exists = await Wishlist.findOne({ movieId });
        if (exists) return res.status(400).json({ message: "Already in wishlist" });

        const newItem = await Wishlist.create({ movieId, title, poster, rating, year });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Remove movie from wishlist
// @route   DELETE /api/wishlist/:id
const removeFromWishlist = async (req, res) => {
    try {
        // We delete by the 'movieId' (the original movie ID)
        await Wishlist.findOneAndDelete({ movieId: req.params.id });
        res.json({ message: "Removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };