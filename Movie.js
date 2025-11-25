// // models/Movie.js
// const mongoose = require('mongoose');

// const movieSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     plot: String,
//     poster: String,
//     genres: [String],
//     imdb: {
//         rating: Number,
//         votes: Number
//     },
//     year: Number
// }, { collection: 'movies' }); // Explicitly target the existing 'movies' collection

// module.exports = mongoose.model('Movie', movieSchema);

// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    plot: String,
    fullplot: String, // Added this for better descriptions
    poster: String,
    genres: [String],
    cast: [String],       // <--- NEW: Array of actor names
    directors: [String],  // <--- NEW: Array of director names
    imdb: {
        rating: Number,
        votes: Number
    },
    year: Number,
    runtime: Number
}, { collection: 'movies' });

module.exports = mongoose.model('Movie', movieSchema);