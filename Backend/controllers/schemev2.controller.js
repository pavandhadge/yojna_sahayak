import Schemev2 from "../models/schemev2.model.js";
import User from "../models/user.model.js";

const createScheme = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const data = JSON.parse(req.body.data);
        console.log("data", data);

        const scheme = new Schemev2(data);
        await scheme.save();
        res.status(201).json(scheme);
    } catch (error) {
        console.error("Error creating scheme:", error);
        res.status(500).json({ error: error.message });
    }
};


const getAllSchemes = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const schemes = await Schemev2.paginate({}, options);
        res.status(200).json({
            schemes: schemes.docs,
            totalPages: schemes.totalPages,
            currentPage: schemes.page,
            totalSchemes: schemes.totalDocs
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSchemeById = async (req, res) => {
    try {
        const scheme = await Schemev2.findById(req.params.id);
        res.status(200).json(scheme);
    }
    catch (error) {
        res.status(404).json({ message: "Scheme not found" });
    }
};

const getSchemeByCategory = async (req, res) => {
    try {
        
        const { page = 1, limit = 9 } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const schemes = await Schemev2.aggregate([
            {
                $search: {
                    index: "default", // Using the Atlas Search index
                    text: {
                        query: req.params.category, // Match the category name
                        path: "schemeCategory", // Field to search
                    },
                },
            },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ]);

        res.status(200).json({
            schemes,
            totalPages: Math.ceil(schemes.length / limit),
            currentPage: page,
            totalSchemes: schemes.length
        });
    } catch (error) {
        res.status(404).json({ message: "Category not found" });
    }
};

const getFilteredSchemes = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const {
            search, openDate, closeDate, state, nodalMinistryName, level,
            category, tags, schemeName
        } = req.query;

        // Parse page and limit as integers
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);

        if (isNaN(parsedLimit) || parsedLimit <= 0) {
            return res.status(400).json({ message: "Invalid limit value" });
        }

        let pipeline = [];

        // Full-text search conditions
        if (search) {
            pipeline.push({
                $search: {
                    index: "default",
                    text: {
                        query: search, // Use the search term
                        path: [
                            "state",
                            "nodalMinistryName",
                            "schemeName",
                            "tags",
                            "level",
                            "Category",
                            "detailedDescription_md"
                        ], // Fields to search in
                    },
                },
            });
        }

        // Handle date range filters for openDate and closeDate
        if (openDate || closeDate) {
            const dateConditions = [];

            if (openDate) {
                dateConditions.push({ openDate: { $gte: new Date(openDate) } });
            }

            if (closeDate) {
                dateConditions.push({ closeDate: { $lte: new Date(closeDate) } });
            }

            dateConditions.push({ openDate: { $eq: null } });
            dateConditions.push({ closeDate: { $eq: null } });

            pipeline.push({ $match: { $or: dateConditions } });
        }

        // Apply additional filters (state, nodalMinistryName, etc.)
        // const filter = {};
        // if (state) filter.state = state;
        // if (nodalMinistryName) filter.nodalMinistryName = nodalMinistryName;
        // if (level) filter.level = level;

        // if (category) {
        //     const categoriesArray = category.split(',');
        //     filter.category = { $in: categoriesArray };
        // }

        // if (tags) {
        //     const tagsArray = tags.split(',');
        //     filter.tags = { $in: tagsArray };
        // }

        // if (schemeName) {
        //     filter.$or = [
        //         { schemeName: { $regex: schemeName, $options: 'i' } },
        //         { schemeShortTitle: { $regex: schemeName, $options: 'i' } },
        //     ];
        // }

        // // Combine the filters
        // if (Object.keys(filter).length > 0) {
        //     pipeline.push({ $match: filter });
        // }

        // // Pagination
        // pipeline.push({ $skip: (parsedPage - 1) * parsedLimit });
        // pipeline.push({ $limit: parsedLimit });

        // // Execute aggregation
        // const schemes = await Schemev2.aggregate(pipeline);
        const filter = {};
const orFilters = [];

if (state) {
    orFilters.push({ state: { $regex: state, $options: 'i' } });
}

if (nodalMinistryName) {
    orFilters.push({ nodalMinistryName: { $regex: nodalMinistryName, $options: 'i' } });
}

if (level) {
    orFilters.push({ level: { $regex: level, $options: 'i' } });
}

if (category) {
    const categoriesArray = category.split(',');
    // Convert each category into a regex for partial match
    orFilters.push({ category: { $in: categoriesArray.map(cat => new RegExp(cat, 'i')) } });
}

if (tags) {
    const tagsArray = tags.split(',');
    // Convert each tag into a regex for partial match
    orFilters.push({ tags: { $in: tagsArray.map(tag => new RegExp(tag, 'i')) } });
}

if (schemeName) {
    orFilters.push(
        { schemeName: { $regex: schemeName, $options: 'i' } },
        { schemeShortTitle: { $regex: schemeName, $options: 'i' } }
    );
}

// Combine the filters
if (orFilters.length > 0) {
    pipeline.push({ $match: { $or: orFilters } });
}

// Pagination
pipeline.push({ $skip: (parsedPage - 1) * parsedLimit });
pipeline.push({ $limit: parsedLimit });

// Execute aggregation
const schemes = await Schemev2.aggregate(pipeline);

        res.status(200).json({
            schemes,
            totalPages: Math.ceil(schemes.length / parsedLimit),
            currentPage: parsedPage,
            totalSchemes: schemes.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving filtered schemes", error: err });
    }
};

// save favorite schemes

const saveFavoriteSchemes = async (req, res) => {
    try {
        // Get the logged-in user's ID from the request
        const userId = req.user._id;

        // Get the scheme IDs from the request body
        const schemeId = req.body.schemeId;

        // Find the user by ID and update the favorites array
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { favorites: schemeId } },
            { new: true }
        );

        // Return a success response
        res.status(200).json({ message: "Favorite schemes saved successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error saving favorite schemes:", error);
        res.status(500).json({ message: "Error saving favorite schemes" });
    }
};

const removeFavoriteSchemes = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params; // Change to use params instead of body

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { favorites: id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Scheme removed from favorites"
        });
    } catch (error) {
        console.error("Error removing favorite scheme:", error);
        res.status(500).json({
            success: false,
            message: "Error removing favorite scheme"
        });
    }
};

const getFavoriteSchemes = async (req, res) => {
    try {
        // Get the logged-in user's ID from the request
        const userId = req.user._id;

        // Find the user by ID and retrieve their favorite schemes
        const user = await User.findById(userId);

        // Return the user's favorite schemes
        res.status(200).json(user.favorites);
    } catch (error) {
        // Handle errors
        console.error("Error retrieving favorite schemes:", error);
        res.status(500).json({ message: "Error retrieving favorite schemes" });
    }
};

export {createScheme, getAllSchemes, getSchemeById, getSchemeByCategory, getFilteredSchemes, saveFavoriteSchemes, removeFavoriteSchemes, getFavoriteSchemes };