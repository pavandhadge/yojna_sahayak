import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Loader2 } from "lucide-react";
import axios from "axios";

const translations = {
  en: {
    title: "Scheme Assistant",
    inputPlaceholder: "Ask about this scheme...",
    welcome:
      "Hello! I can help you understand this scheme better. What would you like to know?",
    thinking: "Thinking...",
    error: "Sorry, I couldn't process your request. Please try again.",
  },
  hi: {
    title: "योजना सहायक",
    inputPlaceholder: "इस योजना के बारे में पूछें...",
    welcome:
      "नमस्ते! मैं आपको इस योजना को बेहतर समझने में मदद कर सकता हूं। आप क्या जानना चाहेंगे?",
    thinking: "सोच रहा हूं...",
    error:
      "क्षमा करें, मैं आपके अनुरोध को प्रोसेस नहीं कर सका। कृपया पुनः प्रयास करें।",
  },
  pa: {
    title: "ਯੋਜਨਾ ਸਹਾਇਕ",
    inputPlaceholder: "ਇਸ ਯੋਜਨਾ ਬਾਰੇ ਪੁੱਛੋ...",
    welcome:
      "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਨੂੰ ਇਸ ਯੋਜਨਾ ਨੂੰ ਬੇਹਤਰ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਤੁਸੀਂ ਕੀ ਜਾਣਨਾ ਚਾਹੋਗੇ?",
    thinking: "ਸੋਚ ਰਿਹਾ ਹਾਂ...",
    error:
      "ਮਾਫ਼ ਕਰਨਾ, ਮੈਂ ਤੁਹਾਡੀ ਬੇਨਤੀ 'ਤੇ ਕਾਰਵਾਈ ਨਹੀਂ ਕਰ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
  },
  bn: {
    title: "প্রকল্প সহায়ক",
    inputPlaceholder: "এই প্রকল্প সম্পর্কে জিজ্ঞাসা করুন...",
    welcome:
      "হ্যালো! আমি আপনাকে এই প্রকল্প ভালভাবে বুঝতে সাহায্য করতে পারি। আপনি কী জানতে চান?",
    thinking: "চিন্তা করছি...",
    error:
      "দুঃখিত, আপনার অনুরোধ প্রক্রিয়া করতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।",
  },
  te: {
    title: "పథకం సహాయకుడు",
    inputPlaceholder: "ఈ పథకం గురించి అడగండి...",
    welcome:
      "హలో! ఈ పథకాన్ని మెరుగ్గా అర్థం చేసుకోవడంలో నేను మీకు సహాయపడగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
    thinking: "ఆలోచిస్తున్నాను...",
    error:
      "క్షమించండి, మీ అభ్యర్థనను ప్రాసెస్ చేయలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.",
  },
  ta: {
    title: "திட்ட உதவியாளர்",
    inputPlaceholder: "இந்த திட்டம் பற்றி கேளுங்கள்...",
    welcome:
      "வணக்கம்! இந்த திட்டத்தை சிறப்பாக புரிந்துகொள்ள நான் உதவ முடியும். நீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?",
    thinking: "யோசிக்கிறேன்...",
    error:
      "மன்னிக்கவும், உங்கள் கோரிக்கையை செயலாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
  },
  gu: {
    title: "યોજના સહાયક",
    inputPlaceholder: "આ યોજના વિશે પૂછો...",
    welcome:
      "નમસ્તે! હું તમને આ યોજના વધુ સારી રીતે સમજવામાં મદદ કરી શકું છું. તમે શું જાણવા માંગો છો?",
    thinking: "વિચારી રહ્યો છું...",
    error:
      "માફ કરશો, હું તમારી વિનંતી પર પ્રક્રિયા કરી શક્યો નથી. કૃપા કરીને ફરી પ્રયાસ કરો.",
  },
  mr: {
    title: "योजना सहाय्यक",
    inputPlaceholder: "या योजनेबद्दल विचारा...",
    welcome:
      "नमस्कार! मी तुम्हाला ही योजना चांगली समजून घेण्यास मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?",
    thinking: "विचार करत आहे...",
    error:
      "क्षमस्व, मी तुमची विनंती प्रक्रिया करू शकलो नाही. कृपया पुन्हा प्रयत्न करा.",
  },
  kn: {
    title: "ಯೋಜನೆ ಸಹಾಯಕ",
    inputPlaceholder: "ಈ ಯೋಜನೆಯ ಬಗ್ಗೆ ಕೇಳಿ...",
    welcome:
      "ನಮಸ್ಕಾರ! ಈ ಯೋಜನೆಯನ್ನು ಉತ್ತಮವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನೀವು ಏನನ್ನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?",
    thinking: "ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...",
    error:
      "ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  },
  ml: {
    title: "പദ്ധതി സഹായി",
    inputPlaceholder: "ഈ പദ്ധതിയെക്കുറിച്ച് ചോദിക്കൂ...",
    welcome:
      "നമസ്കാരം! ഈ പദ്ധതി നന്നായി മനസ്സിലാക്കാൻ ഞാൻ നിങ്ങളെ സഹായിക്കാം. നിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?",
    thinking: "ആലോചിക്കുന്നു...",
    error:
      "ക്ഷമിക്കണം, നിങ്ങളുടെ അഭ്യർത്ഥന പ്രോസസ്സ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
  },
  or: {
    title: "ଯୋଜନା ସହାୟକ",
    inputPlaceholder: "ଏହି ଯୋଜନା ବିଷୟରେ ପଚାରନ୍ତୁ...",
    welcome:
      "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କୁ ଏହି ଯୋଜନାକୁ ଭଲ ଭାବରେ ବୁଝିବାରେ ସାହାଯ୍ୟ କରିପାରିବି। ଆପଣ କ'ଣ ଜାଣିବାକୁ ଚାହାଁନ୍ତି?",
    thinking: "ଚିନ୍ତା କରୁଛି...",
    error:
      "କ୍ଷମା କରନ୍ତୁ, ମୁଁ ଆପଣଙ୍କ ଅନୁରୋଧକୁ ପ୍ରକ୍ରିୟା କରିପାରିଲି ନାହିଁ। ଦୟାକରି ପୁନଃଚେଷ୍ଟା କରନ୍ତୁ।",
  },
  ur: {
    title: "اسکیم اسسٹنٹ",
    inputPlaceholder: "اس اسکیم کے بارے میں پوچھیں...",
    welcome:
      "السلام علیکم! میں آپ کو اس اسکیم کو بہتر طور پر سمجھنے میں مدد کر سکتا ہوں۔ آپ کیا جاننا چاہیں گے؟",
    thinking: "سوچ رہا ہوں...",
    error:
      "معذرت، میں آپ کی درخواست پر عملدرآمد نہیں کر سکا۔ براہ کرم دوبارہ کوشش کریں۔",
  },
  sa: {
    title: "योजना सहायकः",
    inputPlaceholder: "अस्याः योजनायाः विषये पृच्छतु...",
    welcome:
      "नमस्ते! अहं भवन्तं एतां योजनां श्रेष्ठतया बोद्धुं साहाय्यं कर्तुं शक्नोमि। भवान् किं ज्ञातुमिच्छति?",
    thinking: "चिन्तयामि...",
    error:
      "क्षम्यताम्, भवतः अनुरोधं प्रक्रियां कर्तुं न शक्नोमि। कृपया पुनः प्रयत्नं करोतु।",
  },
  ne: {
    title: "योजना सहायक",
    inputPlaceholder: "यस योजनाको बारेमा सोध्नुहोस्...",
    welcome:
      "नमस्ते! म तपाईंलाई यो योजना राम्रोसँग बुझ्न मद्दत गर्न सक्छु। तपाईं के जान्न चाहनुहुन्छ?",
    thinking: "सोच्दै छु...",
    error:
      "माफ गर्नुहोस्, म तपाईंको अनुरोध प्रक्रिया गर्न सकिनँ। कृपया पुनः प्रयास गर्नुहोस्।",
  },
  sd: {
    title: "اسڪيم جو مددگار",
    inputPlaceholder: "هن اسڪيم بابت پڇو...",
    welcome:
      "السلام عليڪم! مان توهان کي هن اسڪيم کي بهتر طريقي سان سمجھڻ ۾ مدد ڪري سگھان ٿو. توهان ڇا ڄاڻڻ چاهيو ٿا؟",
    thinking: "سوچي رهيو آهيان...",
    error:
      "معذرت، مان توهان جي درخواست تي عمل نٿو ڪري سگھان. مهرباني ڪري ٻيهر ڪوشش ڪريو.",
  },
  ks: {
    title: "اسکیم مددگار",
    inputPlaceholder: "یہ اسکیم کی بارے مینٹ پوچھو...",
    welcome:
      "آداب! بہ چھس تہٕ ییتھ اسکیم منز مدد کرنہٕ خاطرٕ تیار۔ تۄہی کیا زاننہٕ چھیو?",
    thinking: "سوچان چھس...",
    error:
      "معاف کریو، بہ نہٕ پیوس تۄہی سوال جواب دیتھ۔ مہربانی کریتھ دوبارہ کوشش کریو۔",
  },
};

const ChatBot = ({ schemeId, schemeName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Reset messages when language changes
    setMessages([
      {
        text: translations[language].welcome,
        type: "bot",
      },
    ]);
  }, [language]);

  const sendInitialMessage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/chatbot/scheme-response`,
        {
          schemeId,
          question: `Tell me about the ${schemeName} scheme. (Please respond in ${language})`,
          language,
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          text: response.data.response,
          type: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: translations[language].error,
          type: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendInitialMessage();
  }, []);

  const formatResponse = (text) => {
    // Remove asterisks and format sections
    const cleanText = text.replace(/\*\*/g, "");

    // Split into sections
    const sections = cleanText.split(
      /(?=\b(?:Objective|Key Features|Eligibility|How to Apply|Required Documents):)/g,
    );

    return sections.map((section, index) => {
      if (section.trim()) {
        const [title, ...content] = section.split(":");
        if (content.length) {
          return (
            <div key={index} className="mb-3">
              <div className="font-semibold text-[#74B83E]">
                {title.trim()}:
              </div>
              <div className="pl-3">
                {content
                  .join(":")
                  .split("*")
                  .map(
                    (item, i) =>
                      item.trim() && (
                        <div key={i} className="text-gray-700">
                          {item.trim()}
                        </div>
                      ),
                  )}
              </div>
            </div>
          );
        }
        return <div key={index}>{section}</div>;
      }
      return null;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      {
        text: userMessage,
        type: "user",
      },
    ]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/chatbot/scheme-response`,
        {
          schemeId,
          question: `Tell me about the ${schemeName} scheme. (Please respond in ${language} even if question is in other language)`,
          language,
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          text: response.data.response,
          type: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: translations[language].error,
          type: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-[600px] h-[800px] flex flex-col">
      <div className="bg-[#74B83E] text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-semibold">{translations[language].title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#5a9230] text-white p-1 rounded"
          >
            {Object.keys(translations).map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            onClick={onClose}
            className="hover:bg-[#5a9230] p-1 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p>{translations[language].welcome}</p>
        </div>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.type === "user"
                ? "bg-[#74B83E] text-white ml-auto"
                : "bg-gray-100 mr-auto"
            } max-w-[85%]`}
          >
            {message.type === "bot" ? (
              formatResponse(message.text)
            ) : (
              <p>{message.text}</p>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" size={20} />
            <p>{translations[language].thinking}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={translations[language].inputPlaceholder}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#74B83E]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-[#74B83E] text-white p-2 rounded-lg hover:bg-[#5a9230] disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
