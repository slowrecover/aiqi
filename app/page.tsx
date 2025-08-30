'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [challengeScore, setChallengeScore] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const challenge = params.get('challenge');
    if (challenge) {
      const score = parseInt(challenge);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        setChallengeScore(score);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {challengeScore !== null && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-black p-4 rounded-lg mb-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-lg font-bold mb-2">⚔️ YOU'VE BEEN CHALLENGED!</p>
              <p className="text-2xl">
                Your friend scored <span className="font-bold text-3xl">{challengeScore}%</span> and thinks you can't beat them.
              </p>
              <p className="text-lg mt-2">Prove them wrong?</p>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-slate-100">
            AI<span className="text-cyan-400">-IQ</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl mb-4 text-slate-300">
            Are you an AI genius or still using Internet Explorer?
          </h2>
          
          <p className="text-xl text-slate-400 mb-8">
            90% of people score under 50%. The question is: are you the 90% or the 10%?
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <p className="text-3xl font-bold text-cyan-400">500+</p>
              <p className="text-sm text-slate-400">Humans Tested</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <p className="text-3xl font-bold text-amber-400">Brutal</p>
              <p className="text-sm text-slate-400">Difficulty Level</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <p className="text-3xl font-bold text-red-400">2%</p>
              <p className="text-sm text-slate-400">Score 90+</p>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/test'}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {challengeScore !== null ? '🎯 Accept Challenge' : '🚀 Start Test'}
          </button>

          <div className="mt-16 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-slate-100">What You'll Be Tested On</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">🤖 AI Integration</h4>
                <p className="text-slate-400">How deeply you've integrated AI into your daily workflow</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-violet-400 mb-2">⚡ Automation Level</h4>
                <p className="text-slate-400">Whether you still do things manually like it's 2010</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-400 mb-2">🧠 Problem Solving</h4>
                <p className="text-slate-400">Your approach to using AI for complex challenges</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-emerald-400 mb-2">📈 Productivity</h4>
                <p className="text-slate-400">How much you let AI handle vs doing it yourself</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-slate-100">Your Result Will Reveal If You're...</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/20">
                <span className="font-bold text-amber-400">AI Overlord</span>
                <span className="text-slate-400">The 2% elite who live in 2030</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg border border-violet-500/20">
                <span className="font-bold text-violet-400">AI Native</span>
                <span className="text-slate-400">Fluent in prompt engineering</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-lg border border-sky-500/20">
                <span className="font-bold text-sky-400">AI Tourist</span>
                <span className="text-slate-400">You try, but it shows</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-lg border border-gray-500/20">
                <span className="font-bold text-gray-400">Digital Amish</span>
                <span className="text-slate-400">Still printing emails in 2025</span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-lg text-slate-400 mb-4">
              ⏱️ Takes only 2 minutes · 🎯 10 questions · 💀 Brutally honest results
            </p>
            <button
              onClick={() => window.location.href = '/test'}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 border border-slate-700"
            >
              I'm Ready for the Truth →
            </button>
          </div>

          <div className="mt-16 text-slate-500 text-sm">
            <p>No signup required · For entertainment purposes only</p>
            <p className="mt-2">Not a scientific assessment · Just brutally honest</p>
          </div>
        </div>
      </div>
    </main>
  );
}