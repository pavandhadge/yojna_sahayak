import express from "express";
import { getPersonalizedSavedSchemes } from "../../controllers/savedSchemes.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const savedSchemeRouter = express.Router();

// router.get("/personalized",  getPersonalizedRecommendations);
savedSchemeRouter.get("/saved", verifyJWT, getPersonalizedSavedSchemes);

export default savedSchemeRouter;
