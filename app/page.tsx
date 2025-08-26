'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const [challengeScore, setChallengeScore] = useState<number | null>(null);
  const [showChallenge, setShowChallenge] = useState(false);

  useEffect(() => {
    const challenge = searchParams.get('challenge');
    if (challenge) {
      const score = parseInt(challenge);
      if (!isNaN(score)) {
        setChallengeScore(score);
        setShowChallenge(true);
      }
    }
  }, [searchParams]);

  const getChallengeMessage = () => {
    if (!challengeScore) return null;
    
    if (challengeScore >= 80) {
      return {
        title: "Someone just flexed on you",
        message: `They scored ${challengeScore}/100 and think they're an AI genius.`,
        cta: "Show them who's boss →"
      };
    } else if (challengeScore >= 60) {
      return {
        title: "Your friend thinks they're smart",
        message: `They got ${challengeScore}/100. That's cute.`,
        cta: "Beat their score →"
      };
    } else if (challengeScore >= 40) {
      return {
        title: "Someone needs your help",
        message: `They only scored ${challengeScore}/100. Embarrassing.`,
        cta: "Show mercy (or don't) →"
      };
    }
    return {
      title: "This is just sad",
      message: `Someone actually scored ${challengeScore}/100. How is that even possible?`,
      cta: "Put them out of their misery →"
    };
  };

  const challenge = getChallengeMessage();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Challenge Banner */}
        {showChallenge && challengeScore && challenge && (
          <div className="mb-8 bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-6 text-center animate-pulse">
            <h2 className="text-2xl font-bold text-yellow-300 mb-2">
              ⚔️ {challenge.title}
            </h2>
            <p className="text-lg mb-4">
              {challenge.message}
            </p>
            <p className="text-sm text-gray-300">
              Think you know AI better? Time to prove it.
            </p>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-pulse">
            AI<span className="text-blue-400">-IQ</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            {showChallenge ? "Ready to destroy your friend's score?" : "How well do you REALLY know AI?"}
          </p>
          
          <p className="text-lg text-gray-400 mb-8">
            Most people think they're AI experts. Most people are wrong.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8 text-sm md:text-base">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">73%</div>
              <div className="text-gray-400">Fail Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">5 min</div>
              <div className="text-gray-400">Test Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">10</div>
              <div className="text-gray-400">Questions</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="font-bold text-lg mb-2">Test Your AI Brain</h3>
            <p className="text-gray-400 text-sm">
              ChatGPT, Claude, Midjourney - think you know them all? Sure you do.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="font-bold text-lg mb-2">Get Your AI Title</h3>
            <p className="text-gray-400 text-sm">
              AI Master or AI Caveman? Find out your true level (prepare for disappointment).
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-lg mb-2">Flex Your Score</h3>
            <p className="text-gray-400 text-sm">
              Share your results and watch your friends fail harder than you did.
            </p>
          </div>
        </div>

        {/* Warning Section */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 text-center">
          <p className="text-red-300 font-semibold">
            ⚠️ WARNING: This test has destroyed many egos
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Side effects include: reality checks, humility, and sudden urge to actually learn AI
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => window.location.href = '/test'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl animate-bounce"
          >
            {showChallenge && challenge ? challenge.cta : "Start Test →"}
          </button>
          
          <p className="text-gray-400 text-sm mt-4">
            No email required. No BS. Just pure AI knowledge testing.
          </p>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">
            Join {Math.floor(Math.random() * 9000) + 1000} people who discovered they're not as smart as they thought
          </p>
        </div>
      </div>
    </main>
  );
}