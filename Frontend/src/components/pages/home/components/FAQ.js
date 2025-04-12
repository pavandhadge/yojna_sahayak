"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border-b border-gray-100 last:border-0 py-5">
      <button
        className="flex justify-between items-center w-full text-left gap-4 transition-colors hover:text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg text-gray-800 group-hover:text-primary transition-colors">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="flex-shrink-0 text-primary w-5 h-5" />
        ) : (
          <ChevronDown className="flex-shrink-0 text-gray-500 w-5 h-5 group-hover:text-primary transition-colors" />
        )}
      </button>
      {isOpen && (
        <div className="mt-3 pl-2 animate-fadeIn">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How can I apply for a scheme?",
      answer:
        "You can apply for a scheme by visiting our 'Explore Schemes' section, selecting the relevant scheme, and following the application process outlined there. Make sure you meet the eligibility criteria before applying.",
    },
    {
      question: "What documents are required for application?",
      answer:
        "The required documents vary depending on the scheme. Generally, you'll need proof of identity (such as Aadhaar card), address proof, income certificate, and sometimes category certificates (SC/ST/OBC). Specific requirements are listed on each scheme's page.",
    },
    {
      question: "Who is eligible for the central schemes?",
      answer:
        "Eligibility for central schemes varies. Typically, factors like age, income, occupation, and sometimes location are considered. Some schemes are targeted at specific groups like women, farmers, or students. Check the specific scheme's eligibility criteria for accurate information.",
    },
    {
      question: "How long does the application process take?",
      answer:
        "The processing time varies for different schemes. Some may provide instant approval, while others might take a few weeks to months. The estimated processing time is usually mentioned in the scheme details. You can also track your application status through our portal.",
    },
    {
      question: "Can I apply for multiple schemes simultaneously?",
      answer:
        "Yes, you can apply for multiple schemes as long as you meet the eligibility criteria for each. However, some schemes may have restrictions on availing benefits from multiple sources, so it's important to read the terms and conditions carefully.",
    },
    {
      question: "What should I do if my application is rejected?",
      answer:
        "If your application is rejected, you will receive a notification explaining the reason. You can review the rejection reason and reapply if you think there was an error or if you can provide additional information. If you need assistance, you can contact our support team for guidance on the next steps.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Find quick answers to common questions about government schemes
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
