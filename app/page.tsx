'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [challengeScore, setChallengeScore] = useState<number | null>(null);
  const [testsTaken, setTestsTaken] = useState(247892);

  useEffect(() => {
    // Check for challenge parameter
    const params = new URLSearchParams(window.location.search);
    const challenge = params.get('challenge');
    if (challenge) {
      const score = parseInt(challenge);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        setChallengeScore(score);
      }
    }

    // Simulate incrementing tests taken
    const interval = setInterval(() => {
      setTestsTaken(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Challenge Banner */}
        {challengeScore !== null && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-4 rounded-lg mb-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-lg font-bold mb-2">⚔️ YOU'VE BEEN CHALLENGED!</p>
              <p className="text-2xl">
                Your friend scored <span className="font-bold text-3xl">{challengeScore}%</span> and thinks you can't beat them.
              </p>
              <p className="text-lg mt-2">Prove them wrong?</p>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center py-12">
          {/* Logo */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            AI<span className="text-blue-400">-IQ</span>
          </h1>
          
          {/* Tagline */}
          <h2 className="text-2xl md:text-3xl mb-4 text-gray-200">
            Are you an AI genius or still using Internet Explorer?
          </h2>
          
          {/* Sub-tagline */}
          <p className="text-xl text-gray-300 mb-8">
            90% of people score under 50%. The question is: are you the 90% or the 10%?
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-cyan-400">{testsTaken.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Tests Taken</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-yellow-400">42%</p>
              <p className="text-sm text-gray-400">Average Score</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-red-400">2%</p>
              <p className="text-sm text-gray-400">Score 90+</p>
            </div>
          </div>

          {/* Main CTA */}
          <button
            onClick={() => window.location.href = '/test'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {challengeScore !== null ? '🎯 Accept Challenge' : '🚀 Start Test'}
          </button>

          {/* Test Preview */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">What You'll Be Tested On</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">🤖 AI Integration</h4>
                <p className="text-gray-300">How deeply you've integrated AI into your daily workflow</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">⚡ Automation Level</h4>
                <p className="text-gray-300">Whether you still do things manually like it's 2010</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400 mb-2">🧠 Problem Solving</h4>
                <p className="text-gray-300">Your approach to using AI for complex challenges</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">📈 Productivity</h4>
                <p className="text-gray-300">How much you let AI handle vs doing it yourself</p>
              </div>
            </div>
          </div>

          {/* Categories Preview */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Your Result Will Reveal If You're...</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                <span className="font-bold text-yellow-400">AI Overlord</span>
                <span className="text-gray-300">The 2% elite who live in 2030</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                <span className="font-bold text-purple-400">AI Native</span>
                <span className="text-gray-300">Fluent in prompt engineering</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                <span className="font-bold text-blue-400">AI Tourist</span>
                <span className="text-gray-300">You try, but it shows</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-lg">
                <span className="font-bold text-gray-400">Digital Amish</span>
                <span className="text-gray-300">Still printing emails in 2025</span>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12">
            <p className="text-lg text-gray-300 mb-4">
              ⏱️ Takes only 2 minutes · 🎯 10 questions · 💀 Brutally honest results
            </p>
            <button
              onClick={() => window.location.href = '/test'}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200"
            >
              I'm Ready for the Truth →
            </button>
          </div>

          {/* Footer */}
          <div className="mt-16 text-gray-400 text-sm">
            <p>No signup required · No AI was harmed in making this test</p>
            <p className="mt-2">Made by humans who are probably scoring lower than you</p>
          </div>
        </div>
      </div>
    </main>
  );
}