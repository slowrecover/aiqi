'use client';

import { useState, useEffect } from 'react';

export default function ResultPage() {
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [rank, setRank] = useState(0);
  const [personality, setPersonality] = useState('');
  const [shareText, setShareText] = useState('');

  useEffect(() => {
    // Get score from localStorage
    const savedScore = localStorage.getItem('aiiq_score') || '0';
    const savedCorrect = localStorage.getItem('aiiq_correct') || '0';
    const savedTotal = localStorage.getItem('aiiq_total') || '10';
    
    const scoreNum = parseInt(savedScore);
    setScore(scoreNum);
    setCorrect(parseInt(savedCorrect));
    setTotal(parseInt(savedTotal));
    
    // Calculate rank
    const rankPercentage = 100 - Math.round((scoreNum / 100) * 60 + Math.random() * 20);
    setRank(rankPercentage);
    
    // Determine personality
    let personalityType = '';
    let message = '';
    
    if (scoreNum >= 80) {
      personalityType = 'AI Master';
      message = "You're fluent in AI. Silicon Valley wants your number!";
    } else if (scoreNum >= 60) {
      personalityType = 'AI Native';
      message = "You speak AI well, but still have an accent.";
    } else if (scoreNum >= 40) {
      personalityType = 'AI Learner';
      message = "You're getting there! Keep practicing.";
    } else {
      personalityType = 'AI Beginner';
      message = "Everyone starts somewhere. Time to level up!";
    }
    
    setPersonality(personalityType);
    
    // Create share text
    const text = `I got ${scoreNum}/100 on AI-IQ! I'm an ${personalityType} 🚀\n\nTest your AI Intelligence (free, 5min):\nhttps://aiiq.vercel.app`;
    setShareText(encodeURIComponent(text));
  }, []);

  const handleShare = (platform: string) => {
    let url = '';
    
    switch(platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${shareText}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=https://aiiq.vercel.app`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=https://aiiq.vercel.app`;
        break;
    }
    
    window.open(url, '_blank');
  };

  const getScoreColor = () => {
    if (score >= 80) return 'from-green-400 to-emerald-600';
    if (score >= 60) return 'from-blue-400 to-purple-600';
    if (score >= 40) return 'from-yellow-400 to-orange-600';
    return 'from-red-400 to-pink-600';
  };

  const getMessage = () => {
    if (score >= 80) return "🏆 Outstanding! You're in the top 10%!";
    if (score >= 60) return "💪 Great job! Above average AI user.";
    if (score >= 40) return "📈 Good start! Room to grow.";
    return "💡 Time to learn more about AI!";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            AI<span className="text-blue-400">-IQ</span> Results
          </h1>
        </div>

        {/* Score Card */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            {/* Score Display */}
            <div className="mb-6">
              <div className={`text-8xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
                {score}
              </div>
              <div className="text-2xl text-gray-300 mt-2">out of 100</div>
            </div>

            {/* Personality Type */}
            <div className="mb-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {personality}
              </div>
              <div className="text-gray-300">
                {getMessage()}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold">{correct}/{total}</div>
                <div className="text-sm text-gray-400">Correct</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold">Top {rank}%</div>
                <div className="text-sm text-gray-400">Ranking</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold">#{Math.floor(Math.random() * 900) + 100}</div>
                <div className="text-sm text-gray-400">Today</div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-bold mb-3">Your AI Skills:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Prompt Engineering</span>
                  <span className="text-yellow-400">
                    {'★'.repeat(Math.max(1, Math.floor(score/20)))}
                    {'☆'.repeat(5 - Math.max(1, Math.floor(score/20)))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tool Selection</span>
                  <span className="text-yellow-400">
                    {'★'.repeat(Math.max(1, Math.floor((score+10)/20)))}
                    {'☆'.repeat(5 - Math.max(1, Math.floor((score+10)/20)))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>AI Understanding</span>
                  <span className="text-yellow-400">
                    {'★'.repeat(Math.max(1, Math.floor((score-10)/20)))}
                    {'☆'.repeat(5 - Math.max(1, Math.floor((score-10)/20)))}
                  </span>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mb-6">
              <p className="text-gray-400 mb-4">Share your score:</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleShare('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors"
                >
                  Twitter/X
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-lg transition-colors"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
                >
                  Facebook
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/test';
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg transition-colors font-bold"
              >
                Retake Test
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-bold text-xl mb-3">💡 Quick Tips to Improve:</h3>
            <ul className="text-left space-y-2 text-gray-300">
              {score < 40 && (
                <>
                  <li>• Start with clear, specific prompts instead of vague requests</li>
                  <li>• Learn the strengths of different AI tools (ChatGPT vs Claude vs others)</li>
                  <li>• Practice breaking complex tasks into smaller steps</li>
                </>
              )}
              {score >= 40 && score < 60 && (
                <>
                  <li>• Experiment with different prompting techniques</li>
                  <li>• Always provide context and examples in your prompts</li>
                  <li>• Learn to fact-check and verify AI responses</li>
                </>
              )}
              {score >= 60 && score < 80 && (
                <>
                  <li>• Master advanced prompting techniques like role-playing</li>
                  <li>• Combine multiple AI tools for complex workflows</li>
                  <li>• Stay updated on new AI capabilities and tools</li>
                </>
              )}
              {score >= 80 && (
                <>
                  <li>• You're already an expert! Share your knowledge with others</li>
                  <li>• Explore cutting-edge AI applications in your field</li>
                  <li>• Consider contributing to AI communities and discussions</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}