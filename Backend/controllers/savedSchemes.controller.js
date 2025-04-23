import { generateSavedSchemes } from "../services/savedSchemes.service.js";

export const getPersonalizedSavedSchemes = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    const recommendations = await generateSavedSchemes(userId, options);

    res.status(200).json({
      success: true,
      data: recommendations,
      message: "Recommendations fetched successfully",
    });
  } catch (error) {
    console.error("Error getting recommendations:", error);
    res.status(500).json({
      success: false,
      message: "Error getting recommendations",
      error: error.message,
    });
  }
};
