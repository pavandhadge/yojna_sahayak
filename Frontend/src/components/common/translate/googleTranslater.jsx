import React, { useEffect, useState } from 'react';

const LANGUAGES = [
    { code: 'en', label: 'english' },
  { code: 'hi', label: 'Hindi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'kn', label: 'Kannada' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'mr', label: 'Marathi' },
  { code: 'or', label: 'Odia' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'te', label: 'Telugu' },
  { code: 'ur', label: 'Urdu' },
];

const TranslatePopup = () => {
  const [showModal, setShowModal] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Google Translate script
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="translate_a/element.js"]');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => console.error('Google Translate script failed to load');
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: LANGUAGES.map((l) => l.code).join(','),
          autoDisplay: false,
        }, 'hidden_translate_element');
        setScriptLoaded(true);
      } catch (e) {
        console.error('Error initializing Google Translate:', e);
      }
    };
  }, []);

  const translateTo = (langCode) => {
    const cookieVal = `/en/${langCode}`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${cookieVal}; path=/`;
    window.location.reload();
  };

  return (
    <div style={{ padding: '10px', textAlign: 'right' }}>
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
                  onClick={() => translateTo(lang.code)}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-sm text-left"
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div id="hidden_translate_element" style={{ display: 'none' }}></div>
    </div>
  );
};

export default TranslatePopup;
