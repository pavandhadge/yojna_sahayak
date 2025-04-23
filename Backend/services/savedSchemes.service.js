import Schemev2 from "../models/schemev2.model.js";
import User from "../models/user.model.js";

export const generateSavedSchemes = async (userId, options) => {
  try {
    const userProfile = await User.findById(userId).lean();
    if (!userProfile) {
      throw new Error("User not found");
    }

    const favoriteIds = userProfile.favorites || [];

    if (!favoriteIds.length) {
      return {
        schemes: [],
        totalPages: 0,
        currentPage: 1,
        totalSchemes: 0,
        hasNextPage: false,
        hasPrevPage: false,
      };
    }

    const parsedPage = parseInt(options.page || 1, 10);
    const parsedLimit = parseInt(options.limit || 9, 10);
    const skip = (parsedPage - 1) * parsedLimit;

    const totalSchemes = favoriteIds.length;
    const totalPages = Math.ceil(totalSchemes / parsedLimit);

    const paginatedFavoriteIds = favoriteIds.slice(skip, skip + parsedLimit);

    const schemes = await Schemev2.find({ _id: { $in: paginatedFavoriteIds } })
      .sort({ createdAt: -1 })
      .lean(); // returns full object

    return {
      schemes,
      totalPages,
      currentPage: parsedPage,
      totalSchemes,
      hasNextPage: parsedPage < totalPages,
      hasPrevPage: parsedPage > 1,
    };
  } catch (error) {
    console.error("Error generating favorite schemes:", error.stack);
    throw new Error("Could not fetch favorites: " + error.message);
  }
};
