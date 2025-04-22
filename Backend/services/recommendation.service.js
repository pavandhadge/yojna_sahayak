import Schemev2 from "../models/schemev2.model.js";
import User from "../models/user.model.js";

export const generateRecommendations = async (userId, options) => {
    try {
        const userProfile = await User.findById(userId).lean();
        if (!userProfile) {
            throw new Error('User not found');
        }

        // Extract relevant user attributes for filtering
        const { state, gender, interests, incomeGroup, age } = userProfile;

        // Build the compound query
        const should = []; // For boosted/relevance criteria
        const must = [];   // For strict requirements
        const filter = []; // For exact matches

        // 1. Strict requirements (must have)
        if (state) {
            must.push({
                text: {
                    query: state,
                    path: "state"
                }
            });
        }

        // 2. Strongly recommended criteria (boosted)
        if (interests && interests.length > 0) {
            should.push({
                text: {
                    query: interests.join(' '),
                    path: "schemeCategory",
                    score: { boost: { value: 3 } } // Higher boost for interests
                }
            });
        }

        // 3. Demographic matching (exact or boosted)
        if (gender) {
            should.push({
                text: {
                    query: gender,
                    path: "gender",
                    score: { boost: { value: 2 } }
                }
            });
        }

        if (incomeGroup) {
            should.push({
                text: {
                    query: incomeGroup,
                    path: "tags",
                    score: { boost: { value: 1.5 } }
                }
            });
        }

        if (age) {
            // Assuming schemes have age-related tags like "Senior Citizen", "Youth", etc.
            should.push({
                text: {
                    query: getAgeGroup(age), // Helper function to categorize age
                    path: "tags",
                    score: { boost: { value: 1 } }
                }
            });
        }

        // Construct the final query
        const compoundQuery = {};
        
        if (must.length > 0) {
            compoundQuery.must = must; // These are required
        }
        
        if (should.length > 0) {
            compoundQuery.should = should;
            compoundQuery.minimumShouldMatch = 1; // At least one should match
        }
        
        if (filter.length > 0) {
            compoundQuery.filter = filter;
        }

        // Pagination options
        const parsedPage = parseInt(options.page || 1, 10);
        const parsedLimit = parseInt(options.limit || 9, 10);

        const pipeline = [];

        if (Object.keys(compoundQuery).length > 0) {
            pipeline.push({
                $search: {
                    index: "default",
                    compound: compoundQuery,
                },
            });
        } else {
            pipeline.push({ $match: {} });
        }

        pipeline.push(
            {
                $addFields: {
                    score: { $meta: "searchScore" },
                },
            },
            {
                $sort: { score: -1, createdAt: -1 }, // Sort by relevance then date
            },
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    schemes: [
                        { $skip: (parsedPage - 1) * parsedLimit },
                        { $limit: parsedLimit },
                        { 
                            $project: {
                                schemeName: 1,
                                schemeShortTitle: 1,
                                state: 1,
                                level: 1,
                                nodalMinistryName: 1,
                                Category: 1,
                                tags: 1,
                                detailedDescription_md: 1,
                                score: 1
                            }
                        }
                    ],
                },
            }
        );

        const result = await Schemev2.aggregate(pipeline);
        const totalSchemes = result[0]?.metadata[0]?.total || 0;
        const totalPages = Math.ceil(totalSchemes / parsedLimit);
        const schemes = result[0]?.schemes || [];

        // If no recommendations found with filters, return random 9 schemes
        if (!schemes.length) {
            console.log('No recommendations found with filters. Returning random 9 schemes...');
            const randomSchemes = await Schemev2.aggregate([
                { $sample: { size: 9 } },
                { 
                    $project: {
                        schemeName: 1,
                        schemeShortTitle: 1,
                        state: 1,
                        level: 1,
                        nodalMinistryName: 1,
                        Category: 1,
                        tags: 1,
                        detailedDescription_md: 1
                    }
                }
            ]);
            

            return {
                schemes: randomSchemes,
                totalPages: 1,
                currentPage: 1,
                totalSchemes: 9,
                hasNextPage: false,
                hasPrevPage: false
            };
        }

        return {
            schemes: schemes,
            totalPages: totalPages,
            currentPage: parsedPage,
            totalSchemes: totalSchemes,
            hasNextPage: parsedPage < totalPages,
            hasPrevPage: parsedPage > 1
        };

    } catch (error) {
        console.error('Error generating recommendations:', error.stack);
        throw new Error('Could not generate recommendations: ' + error.message);
    }
};

// Helper function to categorize age groups
function getAgeGroup(age) {
    if (age >= 60) return "Senior Citizen";
    if (age >= 18) return "Adult";
    if (age >= 13) return "Youth";
    return "Child";
}

// generateRecommendations("67f9872d659936caf71602a1", { page: 1, limit: 9 })
//     .then((result) => {
//         console.log("Recommendations:", result);
//     })
//     .catch((error) => {
//         console.error("Error:", error.message);
//     });