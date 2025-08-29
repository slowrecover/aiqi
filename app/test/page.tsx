'use client';

import { useState, useEffect } from 'react';

// 添加 gtag 类型声明
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

const questions = [
  {
    id: 1,
    question: "When your boss asks for a 'quick report' at 4:45 PM:",
    options: [
      "Open Word and start typing furiously",
      "Google 'quarterly report template 2024'",
      "ChatGPT writes it while you grab snacks",
      "Your AI agent already emailed it 2 hours ago 'just in case'"
    ],
    correct: 3
  },
  {
    id: 2,
    question: "Your Monday morning email inbox has 147 unread messages:",
    options: [
      "Coffee first, then suffering through each one",
      "AI summarizes everything into 5 bullet points",
      "Mark all as read and hope for the best",
      "Your AI assistant already replied to 80% and scheduled meetings from the rest"
    ],
    correct: 3
  },
  {
    id: 3,
    question: "Planning a presentation for tomorrow's board meeting:",
    options: [
      "Your AI saw the meeting invite and already created 3 versions for you to choose",
      "PowerPoint template from 2015 (it's vintage now)",
      "Canva templates (you're not a designer but you try)",
      "Describe your idea to AI, get back complete deck with speaker notes"
    ],
    correct: 0
  },
  {
    id: 4,
    question: "You need to analyze 500 pages of market research:",
    options: [
      "Hire an intern (classic move)",
      "AI digests it into key insights with supporting data",
      "Read the executive summary and pretend you read it all",
      "Your AI already integrated it into your strategy doc with recommendations"
    ],
    correct: 3
  },
  {
    id: 5,
    question: "Learning a new skill for career growth:",
    options: [
      "Buy a course on Udemy (that you'll never finish)",
      "YouTube University at 2x speed",
      "AI creates personalized curriculum and practices with you daily",
      "Hope your colleague will teach you"
    ],
    correct: 2
  },
  {
    id: 6,
    question: "Your Zoom camera 'stops working' during a boring meeting:",
    options: [
      "It actually broke (what are the odds)",
      "You're in pajamas and forgot",
      "Strategic 'technical difficulties'",
      "Your AI avatar is attending while you do actual work"
    ],
    correct: 3
  },
  {
    id: 7,
    question: "Preparing for a job interview tomorrow:",
    options: [
      "Practice answers in the mirror like it's 2010",
      "Your AI analyzes the company, role, and interviewer's background to prep you",
      "Read the company's About page 5 minutes before",
      "Wing it with confidence"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "Client asks for 'innovative solutions' to their problem:",
    options: [
      "Google what competitors are doing",
      "Brainstorm with your team for 3 hours",
      "AI generates 20 solutions ranked by feasibility and impact",
      "Repackage last year's proposal with new fonts"
    ],
    correct: 2
  },
  {
    id: 9,
    question: "Your code isn't working and Stack Overflow is down:",
    options: [
      "AI debugs it and explains what you did wrong (again)",
      "Cry",
      "Try random semicolons until something works",
      "Blame the previous developer (it's tradition)"
    ],
    correct: 0
  },
  {
    id: 10,
    question: "Planning your career for the next 5 years:",
    options: [
      "Vision board with magazine cutouts",
      "Whatever happens, happens",
      "Excel spreadsheet with color-coded goals",
      "AI simulates different career paths based on market trends and your skills"
    ],
    correct: 3
  }
];

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Track test start
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'test_started', {
        event_category: 'engagement',
        event_label: 'test_page_loaded'
      });
    }
  }, []);

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
      
      // Track test completion
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'test_completed', {
          event_category: 'engagement',
          event_label: 'test_finished',
          value: score
        });
      }
      
      // Go to results
      window.location.href = '/result';
    }
  };

  const handleExit = () => {
    // Track test abandonment
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'test_abandoned', {
        event_category: 'engagement',
        event_label: `question_${currentQuestion + 1}`,
        value: currentQuestion + 1
      });
    }
    window.location.href = '/';
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
                onClick={handleExit}
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
            💡 Choose the answer that best reflects your actual workflow
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Not a scientific assessment · For entertainment purposes only
          </p>
        </div>
      </div>
    </main>
  );
}