import express from "express";
import usersRoutes from "./users.routes.js";
import schemesRoutes from "./schemes.routes.js";
import recommendRoutes from "./recommendations.routes.js";
import chatbotRoutes from "./chatbot.routes.js";
import savedSchemeRouter from "./SavedSchemes.routes.js";
import translateRoutes from "./translate.routes.js";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/schemes", schemesRoutes);
router.use("/recommendations", recommendRoutes);
router.use("/chatbot", chatbotRoutes);
router.use("/SavedSchemes", savedSchemeRouter);
router.use("/translate", translateRoutes);
router.use("/", (req, res) => {
  res.send("API V1 Running");
});

export default router;
