import React, { useState, useEffect } from "react";
import axios from "axios";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "bn", label: "Bengali" },
  { code: "gu", label: "Gujarati" },
  { code: "kn", label: "Kannada" },
  { code: "ml", label: "Malayalam" },
  { code: "mr", label: "Marathi" },
  { code: "or", label: "Odia" },
  { code: "pa", label: "Punjabi" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "ur", label: "Urdu" },
];

const TranslatePopup = () => {
  const [showModal, setShowModal] = useState(false);
  const [originalTexts, setOriginalTexts] = useState([]);

  const shouldTranslate = (node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
      const parent = node.parentElement;
      if (parent.tagName !== "SCRIPT" && parent.tagName !== "STYLE") {
        return true;
      }
    }
    return false;
  };

  const traverseAndTranslate = async (targetLang) => {
    const allTextNodes = [];
    const treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false,
    );

    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode;
      if (shouldTranslate(node)) {
        allTextNodes.push(node);
      }
    }

    if (originalTexts.length === 0) {
      setOriginalTexts(allTextNodes.map((node) => node.textContent));
    }

    const textsToTranslate = allTextNodes.map((node) => node.textContent);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/translate`,
        {
          text: textsToTranslate.join("\n"),
          target: targetLang,
        },
      );

      const translatedTexts = response.data.translatedText.split("\n");

      allTextNodes.forEach((node, index) => {
        if (translatedTexts[index]) {
          node.textContent = translatedTexts[index];
        }
      });
    } catch (error) {
      console.error("Error translating:", error);
    }

    setShowModal(false);
  };

  const revertToOriginal = () => {
    const allTextNodes = [];
    const treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false,
    );

    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode;
      if (shouldTranslate(node)) {
        allTextNodes.push(node);
      }
    }

    allTextNodes.forEach((node, index) => {
      if (originalTexts[index]) {
        node.textContent = originalTexts[index];
      }
    });

    setShowModal(false);
  };

  return (
    <div style={{ padding: "10px", textAlign: "right" }}>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Translate
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 shadow-xl mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Select Language</h2>
            <div className="grid grid-cols-2 gap-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => traverseAndTranslate(lang.code)}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-sm text-left"
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={revertToOriginal}
            >
              Revert to Original
            </button>
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslatePopup;
