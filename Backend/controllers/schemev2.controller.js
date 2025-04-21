import path from "path";
import Schemev2 from "../models/schemev2.model.js";
import User from "../models/user.model.js";
import { console } from "inspector";

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
      sort: { createdAt: -1 },
    };

    const schemes = await Schemev2.paginate({}, options);
    res.status(200).json({
      schemes: schemes.docs,
      totalPages: schemes.totalPages,
      currentPage: schemes.page,
      totalSchemes: schemes.totalDocs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSchemeById = async (req, res) => {
  try {
    const scheme = await Schemev2.findById(req.params.id);
    res.status(200).json(scheme);
  } catch (error) {
    res.status(404).json({ message: "Scheme not found" });
  }
};

const getSchemeByCategory = async (req, res) => {
  try {
    const { page = 1, limit = 9 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
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
      { $limit: limit },
    ]);

    res.status(200).json({
      schemes,
      totalPages: Math.ceil(schemes.length / limit),
      currentPage: page,
      totalSchemes: schemes.length,
    });
  } catch (error) {
    res.status(404).json({ message: "Category not found" });
  }
};

// const getFilteredSchemes = async (req, res) => {
//     try {
//         const { page = 1, limit = 9 } = req.query;
//         const {
//             search, openDate, closeDate, state, nodalMinistryName, level,
//             category, tags, schemeName
//         } = req.query;

//         // Parse page and limit as integers
//         const parsedPage = parseInt(page, 10);
//         const parsedLimit = parseInt(limit, 10);

//         if (isNaN(parsedLimit) || parsedLimit <= 0) {
//             return res.status(400).json({ message: "Invalid limit value" });
//         }

//         let pipeline = [];

//         // Full-text search conditions
//         if (search) {
//             pipeline.push({
//                 $search: {
//                     index: "default",
//                     text: {
//                         query: search, // Use the search term
//                         path: [
//                             "state",
//                             "nodalMinistryName",
//                             "schemeName",
//                             "tags",
//                             "level",
//                             "Category",
//                             "detailedDescription_md"
//                         ], // Fields to search in
//                     },
//                 },
//             });
//         }

//         // Handle date range filters for openDate and closeDate
//         if (openDate || closeDate) {
//             const dateConditions = [];

//             if (openDate) {
//                 dateConditions.push({ openDate: { $gte: new Date(openDate) } });
//             }

//             if (closeDate) {
//                 dateConditions.push({ closeDate: { $lte: new Date(closeDate) } });
//             }

//             dateConditions.push({ openDate: { $eq: null } });
//             dateConditions.push({ closeDate: { $eq: null } });

//             pipeline.push({ $match: { $or: dateConditions } });
//         }

//         // Apply additional filters (state, nodalMinistryName, etc.)
//         // const filter = {};
//         // if (state) filter.state = state;
//         // if (nodalMinistryName) filter.nodalMinistryName = nodalMinistryName;
//         // if (level) filter.level = level;

//         // if (category) {
//         //     const categoriesArray = category.split(',');
//         //     filter.category = { $in: categoriesArray };
//         // }

//         // if (tags) {
//         //     const tagsArray = tags.split(',');
//         //     filter.tags = { $in: tagsArray };
//         // }

//         // if (schemeName) {
//         //     filter.$or = [
//         //         { schemeName: { $regex: schemeName, $options: 'i' } },
//         //         { schemeShortTitle: { $regex: schemeName, $options: 'i' } },
//         //     ];
//         // }

//         // // Combine the filters
//         // if (Object.keys(filter).length > 0) {
//         //     pipeline.push({ $match: filter });
//         // }

//         // // Pagination
//         // pipeline.push({ $skip: (parsedPage - 1) * parsedLimit });
//         // pipeline.push({ $limit: parsedLimit });

//         // // Execute aggregation
//         // const schemes = await Schemev2.aggregate(pipeline);
//         const filter = {};
// const orFilters = [];

// if (state) {
//     orFilters.push({ state: { $regex: state, $options: 'i' } });
// }

// if (nodalMinistryName) {
//     orFilters.push({ nodalMinistryName: { $regex: nodalMinistryName, $options: 'i' } });
// }

// if (level) {
//     orFilters.push({ level: { $regex: level, $options: 'i' } });
// }

// if (category) {
//     const categoriesArray = category.split(',');
//     // Convert each category into a regex for partial match
//     orFilters.push({ category: { $in: categoriesArray.map(cat => new RegExp(cat, 'i')) } });
// }

// if (tags) {
//     const tagsArray = tags.split(',');
//     // Convert each tag into a regex for partial match
//     orFilters.push({ tags: { $in: tagsArray.map(tag => new RegExp(tag, 'i')) } });
// }

// if (schemeName) {
//     orFilters.push(
//         { schemeName: { $regex: schemeName, $options: 'i' } },
//         { schemeShortTitle: { $regex: schemeName, $options: 'i' } }
//     );
// }

// // Combine the filters
// if (orFilters.length > 0) {
//     pipeline.push({ $match: { $or: orFilters } });
// }

// // Pagination
// pipeline.push({ $skip: (parsedPage - 1) * parsedLimit });
// pipeline.push({ $limit: parsedLimit });

// // Execute aggregation
// const schemes = await Schemev2.aggregate(pipeline);

//         res.status(200).json({
//             schemes,
//             totalPages: Math.ceil(schemes.length / parsedLimit),
//             currentPage: parsedPage,
//             totalSchemes: schemes.length
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error retrieving filtered schemes", error: err });
//     }
// };
// const getFilteredSchemes = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 9,
//       search,
//       state,
//       category,
//       nodalMinistryName,
//       gender,
//       occupation,
//       minority,
//       casteCategory,
//       employmentStatus,
//       differentlyAbled,
//       residence,
//     } = req.query;

//     const parsedPage = parseInt(page, 10);
//     const parsedLimit = parseInt(limit, 10);

//     const should = [];
//     const must = [];

//     // Search terms (relevance-based)
//     search &&
//       should.push({
//         text: {
//           query: search,
//           path: [
//             "schemeName",
//             "schemeShortTitle",
//             "detailedDescription_md",
//             "tags",
//           ],
//           score: { boost: { value: 3 } },
//         },
//       });

//     category &&
//       should.push({
//         text: {
//           query: category,
//           path: [
//             "schemeName",
//             "schemeShortTitle",
//             "detailedDescription_md",
//             "tags",
//           ],
//           score: { boost: { value: 2 } },
//         },
//       });

//     // Filters (exact match, must match)
//     state &&
//       must.push({
//         text: {
//           query: state,
//           path: "state",
//           score: { boost: { value: 2 } },
//         },
//       });

//     nodalMinistryName &&
//       must.push({
//         text: {
//           query: nodalMinistryName,
//           path: ["schemeName", "schemeShortTitle", "tags"],
//           score: { boost: { value: 2 } },
//         },
//       });
//     residence &&
//       must.push({
//         text: {
//           query: residence,
//           path: ["schemeName", "schemeShortTitle", "tags"],
//           score: { boost: { value: 2 } },
//         },
//       });
//     gender &&
//       must.push({
//         text: {
//           query: gender,
//           path: ["schemeName", "schemeShortTitle", "tags"],
//           score: { boost: { value: 2 } },
//         },
//       });
//     employmentStatus &&
//       must.push({
//         text: {
//           query: employmentStatus,
//           path: ["schemeName", "schemeShortTitle", "tags"],
//           score: { boost: { value: 2 } },
//         },
//       });
//     minority &&
//       must.push({
//         text: {
//           query: minority,
//           path: ["schemeName", "schemeShortTitle", "tags"],
//           score: { boost: { value: 2 } },
//         },
//       });
//     occupation &&
//       must.push({
//         text: {
//           query: occupation,
//           path: ["schemeName", "schemeShortTitle", "tags"],
//           score: { boost: { value: 2 } },
//         },
//       });
//     casteCategory &&
//       must.push({
//         text: {
//           query: casteCategory,
//           path: ["schemeName", "schemeShortTitle", "tags"],
//           score: { boost: { value: 2 } },
//         },
//       });
//     differentlyAbled &&
//       must.push({
//         text: {
//           query: differentlyAbled,
//           path: ["schemeName", "schemeShortTitle", "tags"],
//           score: { boost: { value: 2 } },
//         },
//       });

//     const compoundQuery = {};
//     if (must.length > 0) compoundQuery.must = must;
//     if (should.length > 0) {
//       compoundQuery.should = should;
//       compoundQuery.minimumShouldMatch = 1;
//     }

//     const pipeline = [];

//     if (Object.keys(compoundQuery).length > 0) {
//       pipeline.push({
//         $search: {
//           index: "default",
//           compound: compoundQuery,
//         },
//       });
//     } else {
//       // Optional fallback if no filters — e.g., use $match to fetch all
//       pipeline.push({
//         $match: {}, // fetch everything
//       });
//     }

//     pipeline.push(
//       {
//         $addFields: {
//           score: { $meta: "searchScore" },
//         },
//       },
//       {
//         $sort: { score: -1, createdAt: -1 },
//       },
//       {
//         $facet: {
//           metadata: [{ $count: "total" }],
//           schemes: [
//             { $skip: (parsedPage - 1) * parsedLimit },
//             { $limit: parsedLimit },
//           ],
//         },
//       }
//     );

//     // console.log("parsedPage", parsedPage);
//     console.log("pipeline", JSON.stringify(pipeline, null, 2));
//     const result = await Schemev2.aggregate(pipeline);
//     console.log("result", result);
//     const totalSchemes = result[0]?.metadata[0]?.total || 0;
//     const totalPages = Math.ceil(totalSchemes / parsedLimit);
//     const schemes = result[0]?.schemes || [];

//     res.status(200).json({
//       schemes,
//       totalPages,
//       currentPage: parsedPage,
//       totalSchemes,
//     });
//   } catch (err) {
//     console.error("Error retrieving filtered schemes:", err);
//     res
//       .status(500)
//       .json({ message: "Error retrieving filtered schemes", error: err });
//   }
// };



// const getFilteredSchemes = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 9,
//       search,
//       schemeName,
//       openDate,
//       closeDate,
//       state,
//       nodalMinistryName,
//       level,
//       category,
//       gender,
//       incomeGroup,
//       occupation,
//       residence,
//       differentlyAbbled,
//       minority,
//       casteCategory,
//     } = req.query;

//     const parsedPage = parseInt(page, 10);
//     const parsedLimit = parseInt(limit, 10);

//     const should = [];
//     const must = [];

//     // Search terms (relevance-based)
//     search &&
//       should.push({
//         text: {
//           query: search,
//           path: [
//             "schemeName",
//             "schemeShortTitle",
//             "detailedDescription_md",
//             "tags",
//           ],
//           score: { boost: { value: 3 } },
//         },
//       });

//     // Scheme name specific search
//     schemeName &&
//       should.push({
//         text: {
//           query: schemeName,
//           path: "schemeName",
//           score: { boost: { value: 4 } }, // Higher boost for exact scheme name
//         },
//       });

//     // Category filter
//     category &&
//       should.push({
//         text: {
//           query: category,
//           path: "schemeCategory",
//           score: { boost: { value: 2 } },
//         },
//       });

//     // Date range filters
//     if (openDate || closeDate) {
//       const rangeFilter = {};
//       if (openDate) rangeFilter.gte = new Date(openDate);
//       if (closeDate) rangeFilter.lte = new Date(closeDate);
      
//       must.push({
//         range: {
//           path: "createdAt", // Assuming createdAt represents scheme creation date
//           ...rangeFilter,
//         },
//       });
//     }

//     // Exact match filters
//     state &&
//       must.push({
//         text: {
//           query: state,
//           path: "state",
//         },
//       });

//     level &&
//       must.push({
//         text: {
//           query: level,
//           path: "level",
//         },
//       });

//     nodalMinistryName &&
//       must.push({
//         text: {
//           query: nodalMinistryName,
//           path: "nodalMinistryName.label",
//         },
//       });

//     gender &&
//       must.push({
//         text: {
//           query: gender,
//           path: "gender",
//         },
//       });

//     incomeGroup &&
//       must.push({
//         text: {
//           query: incomeGroup,
//           path: "metadata.incomeGroup", // Assuming incomeGroup is in metadata
//         },
//       });

//     occupation &&
//       must.push({
//         text: {
//           query: occupation,
//           path: "metadata.occupation",
//         },
//       });

//     residence &&
//       must.push({
//         text: {
//           query: residence,
//           path: "metadata.residence",
//         },
//       });

//     differentlyAbbled &&
//       must.push({
//         text: {
//           query: differentlyAbbled,
//           path: "metadata.differentlyAbled",
//         },
//       });

//     minority &&
//       must.push({
//         text: {
//           query: minority,
//           path: "metadata.minority",
//         },
//       });

//     casteCategory &&
//       must.push({
//         text: {
//           query: casteCategory,
//           path: "metadata.casteCategory", // Assuming casteCategory is in metadata
//         },
//       });

//     const compoundQuery = {};
//     if (must.length > 0) compoundQuery.must = must;
//     if (should.length > 0) {
//       compoundQuery.should = should;
//       compoundQuery.minimumShouldMatch = 1;
//     }

//     const pipeline = [];

//     if (Object.keys(compoundQuery).length > 0) {
//       pipeline.push({
//         $search: {
//           index: "default",
//           compound: compoundQuery,
//         },
//       });
//     } else {
//       // Optional fallback if no filters
//       pipeline.push({
//         $match: {},
//       });
//     }

//     pipeline.push(
//       {
//         $addFields: {
//           score: { $meta: "searchScore" },
//         },
//       },
//       {
//         $sort: { score: -1, createdAt: -1 },
//       },
//       {
//         $facet: {
//           metadata: [{ $count: "total" }],
//           schemes: [
//             { $skip: (parsedPage - 1) * parsedLimit },
//             { $limit: parsedLimit },
//           ],
//         },
//       }
//     );

//     const result = await Schemev2.aggregate(pipeline);
//     const totalSchemes = result[0]?.metadata[0]?.total || 0;
//     const totalPages = Math.ceil(totalSchemes / parsedLimit);
//     const schemes = result[0]?.schemes || [];

//     res.status(200).json({
//       schemes,
//       totalPages,
//       currentPage: parsedPage,
//       totalSchemes,
//     });
//   } catch (err) {
//     console.error("Error retrieving filtered schemes:", err);
//     res
//       .status(500)
//       .json({ message: "Error retrieving filtered schemes", error: err });
//   }
// };
const getFilteredSchemes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      search,
      schemeName,
      openDate,
      closeDate,
      state,
      nodalMinistryName,
      level,
      category,
      gender,
      incomeGroup,
      occupation,
      residence,
      differentlyabled,
      minority,
      casteCategory,
    } = req.query;

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    const should = [];
    const filter = [];

    // Search terms (fuzzy/relevance-based)
    if (search) {
      should.push({
        text: {
          query: search,
          path: [
            "schemeName",
            "schemeShortTitle",
            "detailedDescription_md",
            "tags",
          ],
          score: { boost: { value: 3 } },
        },
      });
    }

    if (schemeName) {
      should.push({
        text: {
          query: schemeName,
          path: "schemeName",
          score: { boost: { value: 4 } },
        },
      });
    }

    if (category) {
      should.push({
        text: {
          query: category,
          path: "schemeCategory",
          score: { boost: { value: 2 } },
        },
      });
    }

    // Date range filters
    if (openDate || closeDate) {
      const rangeFilter = {};
      if (openDate) rangeFilter.gte = new Date(openDate);
      if (closeDate) rangeFilter.lte = new Date(closeDate);

      filter.push({
        range: {
          path: "createdAt",
          ...rangeFilter,
        },
      });
    }

    // Modified exact filter function
    const addExactFilter = (value, path, fallbackToMissing = false) => {
      // Only proceed if there's a value provided for this filter
      if (value) {
        
        // Step 1: Build basic filter — match documents where the field matches the given value
        const shouldConditions = [
          { 
            text: {
              query: value,  // The filter value to match
              path: path     // The document field (can be nested like "metadata.occupation")
            }
          }
        ];
    
        // Step 2: (Optional) Add a secondary condition to ALSO match documents where the field is missing
        // This helps in cases where a missing field should be treated as "not applicable" and included
        if (fallbackToMissing) {
          shouldConditions.push({
            compound: {
              mustNot: [
                { exists: { path } } // "must not exist" = field is missing/null/undefined
              ]
            }
          });
        }
    
        // Step 3: Add this entire set of conditions into the main `filter` array
        // We use `compound.should` so that:
        // - If any condition in `shouldConditions` matches, the document passes the filter
        filter.push({
          compound: {
            should: shouldConditions
          }
        });
      }
    };
    

    addExactFilter(state, "state",false);
    addExactFilter(level, "level",false);
    addExactFilter(nodalMinistryName, "nodalMinistryName.label");
    addExactFilter(gender, "gender");
    addExactFilter(incomeGroup, "metadata.incomeGroup");
    addExactFilter(occupation, "metadata.occupation");
    addExactFilter(residence, "metadata.residence");
    addExactFilter(differentlyabled, "metadata.differentlyAbled", false);
    addExactFilter(minority, "metadata.minority");
    addExactFilter(casteCategory, "metadata.casteCategory");

    const compoundQuery = {};
    if (filter.length > 0) compoundQuery.filter = filter;
    if (should.length > 0) {
      compoundQuery.should = should;
      compoundQuery.minimumShouldMatch = 1;
    }

    const pipeline = [];

    if (Object.keys(compoundQuery).length > 0) {
      pipeline.push({
        $search: {
          index: "default",
          compound: compoundQuery,
        },
      });
    } else {
      pipeline.push({
        $match: {},
      });
    }

    pipeline.push(
      {
        $addFields: {
          score: { $meta: "searchScore" },
        },
      },
      {
        $sort: { score: -1, createdAt: -1 },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          schemes: [
            { $skip: (parsedPage - 1) * parsedLimit },
            { $limit: parsedLimit },
          ],
        },
      }
    );

    const result = await Schemev2.aggregate(pipeline);
    const totalSchemes = result[0]?.metadata[0]?.total || 0;
    const totalPages = Math.ceil(totalSchemes / parsedLimit);
    const schemes = result[0]?.schemes || [];

    res.status(200).json({
      success: true,
      schemes,
      totalPages,
      currentPage: parsedPage,
      totalSchemes,
    });
  } catch (err) {
    console.error("Error retrieving filtered schemes:", err);
    res.status(500).json({ 
      success: false,
      message: "Error retrieving filtered schemes",
      error: err.message || err.errmsg || "Unknown error" 
    });
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
      message: "Scheme removed from favorites",
    });
  } catch (error) {
    console.error("Error removing favorite scheme:", error);
    res.status(500).json({
      success: false,
      message: "Error removing favorite scheme",
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

export {
  createScheme,
  getAllSchemes,
  getSchemeById,
  getSchemeByCategory,
  getFilteredSchemes,
  saveFavoriteSchemes,
  removeFavoriteSchemes,
  getFavoriteSchemes,
};
