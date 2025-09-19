import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const languageMap = {
  en: "English",
  hi: "Hindi",
  pa: "Punjabi",
  bn: "Bengali",
  te: "Telugu",
  ta: "Tamil",
  gu: "Gujarati",
  mr: "Marathi",
  kn: "Kannada",
  ml: "Malayalam",
  or: "Oriya",
  ur: "Urdu",
  sa: "Sanskrit",
  ne: "Nepali",
  sd: "Sindhi",
  ks: "Kashmiri",
};

export const generateSchemeResponse = async (
  scheme,
  question,
  language = "en",
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const fullLanguageName = languageMap[language] || "English";

    // Create a context-aware prompt with language instruction
    const prompt = `
        You are a helpful assistant for a government scheme portal. Your goal is to provide clear, concise, and helpful information to users.

        Here is the information about a specific government scheme:

        Basic Information:
        - Name: ${scheme.schemeName}
        - Short Title: ${scheme.schemeShortTitle}
        - Level: ${scheme.level}
        - State: ${scheme.state || "Not specified"}
        - Ministry: ${scheme.nodalMinistryName?.label || "Not specified"}

        Timeline:
        - Open Date: ${scheme.openDate ? new Date(scheme.openDate).toLocaleDateString() : "Not specified"}
        - Close Date: ${scheme.closeDate ? new Date(scheme.closeDate).toLocaleDateString() : "Not specified"}

        Categories and Tags:
        - Categories: ${scheme.schemeCategory?.join(", ")}
        - Tags: ${scheme.tags?.join(", ")}

        Detailed Information:
        - Description: ${scheme.detailedDescription_md}
        - Eligibility Criteria: ${scheme.eligibilityDescription_md}

        Application Process:
        ${scheme.applicationProcess
          ?.map(
            (process) => `
            Mode: ${process.mode}
            Process: ${JSON.stringify(process.process)}
        `,
          )
          .join("\n")}

        Required Documents:
        ${scheme.documents_required?.map((doc) => JSON.stringify(doc)).join("\n")}

        Benefits:
        ${scheme.benefits?.map((benefit) => JSON.stringify(benefit)).join("\n")}

        References:
        ${scheme.references?.map((ref) => `- ${ref.title}: ${ref.url}`).join("\n")}

        FAQs:
        ${scheme.faqs?.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n")}

        User Question: ${question}

        Please answer the user's question.
        - If the question is about the scheme, use the provided information to answer.
        - If the question is not about the scheme, answer it as a general helpful assistant.

        Important:
        1. Respond in ${fullLanguageName} language.
        2. Keep the response focused and relevant to the question.
        3. If information is not available in the scheme details, clearly state that.
        `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    return "I apologize, but I'm having trouble processing your question. Please try asking in a different way or contact support for assistance.";
  }
};
