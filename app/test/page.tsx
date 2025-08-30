'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

const questions = [
  {
    id: 1,
    question: "Your boss wants a 'quick report' by 5 PM:",
    options: [
      "Actually write it like it's 1995",
      "Copy last year's and pray nobody notices",
      "ChatGPT writes it while you pretend to look busy",
      "Your AI already sent it this morning, you're just sitting there"
    ],
    correct: 3
  },
  {
    id: 2,
    question: "147 unread emails on Monday morning:",
    options: [
      "Read them all like a psychopath",
      "Mass delete and blame the spam filter",
      "AI summarizes them in 30 seconds while you drink coffee",
      "Your AI already replied to the important ones at 3 AM"
    ],
    correct: 3
  },
  {
    id: 3,
    question: "Tomorrow's presentation isn't ready:",
    options: [
      "Pull an all-nighter with PowerPoint",
      "Recycling old slides and hoping nobody remembers",
      "Ask ChatGPT nicely to make one",
      "Your AI predicted this meeting and already has 3 versions ready"
    ],
    correct: 3
  },
  {
    id: 4,
    question: "500 pages of 'urgent' market research to analyze:",
    options: [
      "Actually read it (and die inside)",
      "Ctrl+F for keywords and fake the rest",
      "Feed it to AI and get a summary",
      "Your AI already integrated it into your strategy while you slept"
    ],
    correct: 3
  },
  {
    id: 5,
    question: "Need to learn Python for a new project:",
    options: [
      "Buy a $200 course you'll never finish",
      "YouTube tutorials at 2x speed",
      "Let AI teach you exactly what you need",
      "Why learn? AI writes better code than you anyway"
    ],
    correct: 2
  },
  {
    id: 6,
    question: "Your code doesn't work and it's 2 AM:",
    options: [
      "AI fixes it and explains why you're an idiot",
      "Random semicolons until something happens",
      "Stack Overflow is down, time to panic",
      "Blame the compiler and go to bed"
    ],
    correct: 0
  },
  {
    id: 7,
    question: "Client asks for 'innovative solutions':",
    options: [
      "Google what competitors did in 2019",
      "Brainstorm = everyone pretends to think",
      "AI generates 20 ideas ranked by feasibility",
      "Say 'blockchain' and 'synergy' until they leave"
    ],
    correct: 2
  },
  {
    id: 8,
    question: "Writing your LinkedIn 'thought leadership' post:",
    options: [
      "Authentic thoughts (lol who does this)",
      "Copy Gary Vee but make it worse",
      "ChatGPT writes it, you add emoji",
      "AI writes, posts, and replies to comments while you sleep"
    ],
    correct: 3
  },
  {
    id: 9,
    question: "Annual performance review time:",
    options: [
      "List actual achievements like a sucker",
      "Exaggerate everything by 200%",
      "AI quantifies your impact with fake metrics",
      "AI wrote it in January, you've been coasting since"
    ],
    correct: 3
  },
  {
    id: 10,
    question: "Someone asks 'What does AI think about this?':",
    options: [
      "Explain that AI doesn't 'think'",
      "Make up something that sounds smart",
      "Ask AI what it thinks about itself",
      "You've merged with AI, there is no difference anymore"
    ],
    correct: 0
  }
];

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

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
      let correct = 0;
      newAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
          correct++;
        }
      });
      
      const score = Math.round((correct / questions.length) * 100);
      
      localStorage.setItem('aiiq_score', score.toString());
      localStorage.setItem('aiiq_correct', correct.toString());
      localStorage.setItem('aiiq_total', questions.length.toString());
      
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'test_completed', {
          event_category: 'engagement',
          event_label: 'test_finished',
          value: score
        });
      }
      
      window.location.href = '/result';
    }
  };

  const handleExit = () => {
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-100">
            AI<span className="text-cyan-400">-IQ</span> Test
          </h1>
          <p className="text-slate-400">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-slate-700/30 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-slate-100">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    selectedOption === index
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      : 'bg-slate-700/50 hover:bg-slate-700 text-slate-200 border border-slate-600'
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

            <div className="mt-8 flex justify-between">
              <button
                onClick={handleExit}
                className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
              >
                Exit Test
              </button>
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all duration-200"
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next →'}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-slate-500 text-sm">
            💡 Be honest. The AI knows when you're lying anyway.
          </p>
        </div>
      </div>
    </main>
  );
}