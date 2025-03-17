import React, { useState } from 'react';

// Define types for the props
interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode; // Can be either string or JSX content
  number?: number; // Optional number
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 ${isOpen ? 'shadow-md' : 'hover:shadow'}`}>
      <button
        className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-orange-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3 pr-4">
          {number !== undefined && (
            <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
              {number}
            </span>
          )}
          <h3 className="text-lg font-medium text-gray-900 leading-tight">{question}</h3>
        </div>
        <div className="flex-shrink-0">
          <span className={`flex items-center justify-center h-8 w-8 rounded-full border border-gray-200 ${isOpen ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'} transition-colors duration-200`}>
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 text-gray-700 border-t border-gray-100">
          <div className="prose prose-sm sm:prose max-w-none">
            {typeof answer === 'string' ? <p>{answer}</p> : answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
