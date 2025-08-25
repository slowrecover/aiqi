'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [totalTests, setTotalTests] = useState(23456);
  const [todayTests, setTodayTests] = useState(1234);
  const [averageScore, setAverageScore] = useState(58);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTests(prev => prev + Math.floor(Math.random() * 3));
      setTodayTests(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartTest = () => {
    setIsLoading(true);
    window.location.href = '/test';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Live Stats Bar */}
      <div className="bg-black/30 backdrop-blur-sm py-3 px-4 text-center">
        <div className="flex justify-center items-center space-x-6 text-sm">
          <span className="flex items-center gap-2">
            <span className="text-green-400">●</span> 
            {totalTests.toLocaleString()} tested globally
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:flex items-center gap-2">
            🔥 {todayTests.toLocaleString()} today
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:flex items-center gap-2">
            📊 Average: {averageScore}/100
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-bold mb-2">
              AI<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">-IQ</span>
            </h1>
            <div className="flex justify-center gap-1 text-yellow-400 text-xl">
              ★★★★★
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What's Your AI Intelligence?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            90% of people score below 60. Are you smarter?
          </p>

          <button
            onClick={handleStartTest}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Start Free Test → (5 min)'}
          </button>

          <p className="mt-4 text-gray-400">
            No signup • 100% Free • Instant results
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="font-bold mb-2">AI-IQ Score</h3>
            <p className="text-sm text-gray-300">Scientific 0-100 scale</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold mb-2">AI Personality</h3>
            <p className="text-sm text-gray-300">Discover your AI type</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold mb-2">Global Rank</h3>
            <p className="text-sm text-gray-300">Compare worldwide</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-bold mb-2">AI Tips</h3>
            <p className="text-sm text-gray-300">Personalized advice</p>
          </div>
        </div>

        {/* Recent Results */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Recent Test Results</h3>
          <div className="space-y-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
              <span>🇺🇸 Someone from New York</span>
              <span className="text-green-400 font-bold">78/100 - AI Native</span>
              <span className="text-gray-400 text-sm">2 min ago</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
              <span>🇬🇧 Someone from London</span>
              <span className="text-yellow-400 font-bold">62/100 - AI Learner</span>
              <span className="text-gray-400 text-sm">5 min ago</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
              <span>🇨🇦 Someone from Toronto</span>
              <span className="text-purple-400 font-bold">91/100 - AI Master 🏆</span>
              <span className="text-gray-400 text-sm">8 min ago</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Questions?</h3>
          <div className="space-y-4">
            <details className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer">
              <summary className="font-bold">Is it really free?</summary>
              <p className="mt-2 text-gray-300">Yes, 100% free. No credit card, no signup, no tricks.</p>
            </details>
            <details className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer">
              <summary className="font-bold">How long does it take?</summary>
              <p className="mt-2 text-gray-300">Just 5 minutes for the test, with instant results.</p>
            </details>
            <details className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer">
              <summary className="font-bold">What do I learn?</summary>
              <p className="mt-2 text-gray-300">Your AI-IQ score, AI personality type, global ranking, and personalized tips.</p>
            </details>
          </div>
        </div>
      </div>
    </main>
  );
}