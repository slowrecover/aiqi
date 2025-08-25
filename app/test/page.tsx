'use client';

import { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "You need to write a professional email. What's the best way to use AI?",
    options: [
      "Just type 'write an email'",
      "Provide context, tone, key points, and desired outcome",
      "AI can't write professional emails",
      "Copy an example from Google"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Which AI tool is best for analyzing large spreadsheets?",
    options: [
      "ChatGPT with Code Interpreter",
      "Midjourney",
      "Stable Diffusion",
      "DALL-E"
    ],
    correct: 0
  },
  {
    id: 3,
    question: "When asking AI for help with code, you should:",
    options: [
      "Paste all code and say 'fix this'",
      "Explain the problem, show relevant code, describe what you tried",
      "Let AI write everything from scratch",
      "Never use AI for coding"
    ],
    correct: 1
  },
  {
    id: 4,
    question: "What's the main limitation of current AI models?",
    options: [
      "They can't be creative",
      "They lack real-time data and personal experience",
      "They only work in English",
      "They can't understand context"
    ],
    correct: 1
  },
  {
    id: 5,
    question: "To get better AI responses, you should:",
    options: [
      "Use all caps for emphasis",
      "Keep prompts very short",
      "Break complex tasks into steps",
      "Repeat the question multiple times"
    ],
    correct: 2
  },
  {
    id: 6,
    question: "Which task is AI currently WORST at?",
    options: [
      "Writing essays",
      "Translating languages",
      "Understanding personal emotions and context",
      "Solving math problems"
    ],
    correct: 2
  },
  {
    id: 7,
    question: "When should you NOT use AI?",
    options: [
      "For creative writing",
      "For legal or medical advice without verification",
      "For learning new concepts",
      "For drafting emails"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "The best way to fact-check AI responses is to:",
    options: [
      "Ask the same AI again",
      "Trust it completely",
      "Verify with reliable sources",
      "Assume it's always wrong"
    ],
    correct: 2
  },
  {
    id: 9,
    question: "AI 'hallucinations' refer to:",
    options: [
      "Visual glitches in AI art",
      "When AI makes up false information",
      "AI becoming conscious",
      "Errors in voice recognition"
    ],
    correct: 1
  },
  {
    id: 10,
    question: "For best results, AI prompts should be:",
    options: [
      "As short as possible",
      "Vague and open-ended",
      "Clear, specific, and contextual",
      "Written in code"
    ],
    correct: 2
  }
];

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Calculate score
      let correct = 0;
      newAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
          correct++;
        }
      });
      
      const score = Math.round((correct / questions.length) * 100);
      
      // Store in localStorage
      localStorage.setItem('aiiq_score', score.toString());
      localStorage.setItem('aiiq_correct', correct.toString());
      localStorage.setItem('aiiq_total', questions.length.toString());
      
      // Go to results
      window.location.href = '/result';
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            AI<span className="text-blue-400">-IQ</span> Test
          </h1>
          <p className="text-gray-300">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              {questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    selectedOption === index
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-100'
                  }`}
                >
                  <div className="flex items-start">
                    <span className="mr-3 font-bold">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Exit Test
              </button>
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all duration-200"
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next →'}
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-gray-400 text-sm">
            💡 Choose the answer that best reflects effective AI usage
          </p>
        </div>
      </div>
    </main>
  );
}