const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    movieId: { type: String, required: true, unique: true }, // The ID from the original movie
    title: String,
    poster: String,
    rating: String,
    year: Number
});

module.exports = mongoose.model('Wishlist', wishlistSchema);