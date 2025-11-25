// controllers/movieController.js
const Movie = require('../models/Movie');

// const getMovies = async (req, res) => {
//     try {
//         const movies = await Movie.find({ poster: { $exists: true, $ne: null } }).limit(40);
//         res.json(movies);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const getMovies = async (req, res) => {
//     try {
//         // 1. Destructure query parameters from the URL
//         const { title, genre } = req.query;

//         // 2. Build an empty query object
//         let query = {};

//         // 3. Search Logic:
//         // If title exists, use Regex for "contains" search (case-insensitive)
//         if (title) {
//             query.title = { $regex: title, $options: 'i' };
//         }

//         // If genre exists, exact match (Mongoose handles array checking automatically)
//         if (genre) {
//             query.genres = genre;
//         }

//         // 4. Execute Query
//         // We limit to 50 now so search results aren't cut off too early
//         const movies = await Movie.find(query).limit(50);
        
//         res.json(movies);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const getMovies = async (req, res) => {
//     try {
//         // 1. Destructure new params
//         const { title, genre, startYear, endYear } = req.query;

//         let query = {};

//         // 2. Title Search (Regex)
//         if (title) {
//             query.title = { $regex: title, $options: 'i' };
//         }

//         // 3. Genre Filter
//         if (genre) {
//             query.genres = genre;
//         }

//         // 4. Time Range Filter (The New Part)
//         if (startYear || endYear) {
//             query.year = {}; // Initialize the year filter object
            
//             if (startYear) {
//                 query.year.$gte = Number(startYear); // Greater than or equal
//             }
            
//             if (endYear) {
//                 query.year.$lte = Number(endYear);   // Less than or equal
//             }
//         }

//         // 5. Execute
//         const movies = await Movie.find(query).limit(50);
//         res.json(movies);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const getMovies = async (req, res) => {
//     try {
//         // 1. Get page number from URL (default to 1 if missing)
//         const page = parseInt(req.query.page) || 1;
//         const limit = 20; // Number of movies per page
//         const skip = (page - 1) * limit;

//         const { title, genre, startYear, endYear } = req.query;

//         let query = {};

//         if (title) query.title = { $regex: title, $options: 'i' };
//         if (genre) query.genres = genre;
//         if (startYear || endYear) {
//             query.year = {};
//             if (startYear) query.year.$gte = Number(startYear);
//             if (endYear) query.year.$lte = Number(endYear);
//         }

//         // 2. Apply .skip() and .limit()
//         const movies = await Movie.find(query)
//             .skip(skip)
//             .limit(limit);
            
//         res.json(movies);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

const getMovies = async (req, res) => {
    try {
        // 1. Pagination Setup
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        // 2. Destructure ALL search parameters
        const { title, genre, startYear, endYear, cast, director } = req.query;

        let query = {};

        // 3. Build Query
        if (title) query.title = { $regex: title, $options: 'i' };
        if (genre) query.genres = genre;
        
        // NEW: Cast & Director Search (Regex for partial match)
        if (cast) query.cast = { $regex: cast, $options: 'i' };
        if (director) query.directors = { $regex: director, $options: 'i' };

        if (startYear || endYear) {
            query.year = {};
            if (startYear) query.year.$gte = Number(startYear);
            if (endYear) query.year.$lte = Number(endYear);
        }

        // 4. Execute
        const movies = await Movie.find(query)
            .skip(skip)
            .limit(limit);
            
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getMovies, getMovieById };