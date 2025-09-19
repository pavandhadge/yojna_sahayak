import { translate } from "../services/translate.service.js";

export const translateText = async (req, res) => {
  try {
    const { text, target } = req.body;

    if (!text || !target) {
      return res.status(400).json({
        message: "Text and target language are required",
      });
    }

    const translatedText = await translate(text, target);
    res.status(200).json({ translatedText });
  } catch (error) {
    console.error("Error in translation:", error);
    res.status(500).json({
      message: "Error translating text",
    });
  }
};
