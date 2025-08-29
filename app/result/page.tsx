'use client';

import { useEffect, useState } from 'react';

// 添加 gtag 类型声明
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

export default function ResultPage() {
  const [score, setScore] = useState<number | null>(null);
  const [correct, setCorrect] = useState<number>(0);
  const [total, setTotal] = useState<number>(10);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Get score from localStorage
    const savedScore = localStorage.getItem('aiiq_score');
    const savedCorrect = localStorage.getItem('aiiq_correct');
    const savedTotal = localStorage.getItem('aiiq_total');
    
    if (savedScore) {
      const scoreNum = parseInt(savedScore);
      setScore(scoreNum);
      setCorrect(parseInt(savedCorrect || '0'));
      setTotal(parseInt(savedTotal || '10'));
      
      // Create share URL with challenge parameter
      const url = `${window.location.origin}?challenge=${scoreNum}`;
      setShareUrl(url);

      // Update statistics
      updateStatistics(scoreNum);
      
      // Track with Google Analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'test_completed', {
          event_category: 'engagement',
          event_label: getPersonalityTitle(scoreNum),
          value: scoreNum
        });
      }
    } else {
      // No score, redirect to test
      window.location.href = '/test';
    }
  }, []);

  // Helper function to get personality title
  const getPersonalityTitle = (score: number) => {
    if (score >= 90) return "AI Overlord";
    if (score >= 70) return "AI Native";
    if (score >= 40) return "AI Tourist";
    return "Digital Amish";
  };

  // Update statistics in localStorage
  const updateStatistics = (newScore: number) => {
    try {
      // Log for debugging
      console.log('Updating statistics with score:', newScore);
      
      // Update total tests count
      const currentTotal = parseInt(localStorage.getItem('aiiq_total_tests') || '0');
      const newTotal = currentTotal + 1;
      localStorage.setItem('aiiq_total_tests', newTotal.toString());
      console.log('Total tests updated:', newTotal);
      
      // Update scores array
      const scoresStr = localStorage.getItem('aiiq_all_scores');
      const scores = scoresStr ? JSON.parse(scoresStr) : [];
      scores.push(newScore);
      
      // Keep only last 100 scores
      if (scores.length > 100) {
        scores.shift();
      }
      localStorage.setItem('aiiq_all_scores', JSON.stringify(scores));
      console.log('Scores array updated, length:', scores.length);
      
      // Update level distribution
      const levelsStr = localStorage.getItem('aiiq_level_dist');
      const levels = levelsStr ? JSON.parse(levelsStr) : {};
      const level = getPersonalityTitle(newScore);
      levels[level] = (levels[level] || 0) + 1;
      localStorage.setItem('aiiq_level_dist', JSON.stringify(levels));
      console.log('Level distribution updated:', levels);
      
      // Force a storage event for other tabs
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.error('Error updating statistics:', error);
    }
  };

  if (score === null) {
    return <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />;
  }

  // Determine AI personality based on score
  const getPersonality = () => {
    if (score >= 90) return {
      title: "AI Overlord",
      emoji: "🤖👑",
      color: "from-yellow-400 to-orange-500",
      description: "You don't use AI, you ARE the AI. Your brain runs on GPT-4 and your blood type is API+. While others Google 'how to use ChatGPT', you're already building your third AI startup. Honestly, we're scared of you.",
      shortRoast: "My AI has an AI assistant",
      ranking: "Top 2%"
    };
    if (score >= 70) return {
      title: "AI Native", 
      emoji: "🚀",
      color: "from-purple-400 to-pink-500",
      description: "You speak fluent prompt engineering. Your idea of small talk is comparing Claude vs GPT benchmarks. Your browser has 47 AI tool tabs open right now. Touch grass occasionally.",
      shortRoast: "I prompt engineer my coffee order",
      ranking: "Top 15%"
    };
    if (score >= 40) return {
      title: "AI Tourist",
      emoji: "🗺️",
      color: "from-blue-400 to-cyan-500",
      description: "You use AI like a tourist uses Google Translate - functional but painful to watch. You still say 'Hey Siri' to ChatGPT sometimes. There's hope for you, barely.",
      shortRoast: "Still saying 'Hey Siri' to ChatGPT",
      ranking: "Top 60%"
    };
    return {
      title: "Digital Amish",
      emoji: "🕯️",
      color: "from-gray-400 to-gray-600",
      description: "You just discovered copy-paste last week and it blew your mind. Your password is still 'password123'. You print emails to read them better. We respect your commitment to tradition though.",
      shortRoast: "My password is still password123",
      ranking: "Bottom 40%"
    };
  };

  const personality = getPersonality();

  // Enhanced share text with emojis and formatting
  const getShareText = () => {
    return `🎯 AI-IQ Test Result: ${score}%

${personality.emoji} Level: ${personality.title.toUpperCase()}
💀 Roast: "${personality.shortRoast}"
📊 Ranking: ${personality.ranking}

Think you can beat ${score}%? Take the test:
${shareUrl}`;
  };

  const shareText = getShareText();

  // Platform-specific share functions
  const handleShare = (platform: string) => {
    // Track share event
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'share', {
        event_category: 'engagement',
        event_label: platform,
        value: score
      });
    }

    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    // Short version for Twitter due to character limit
    const twitterText = `I got ${score}% on AI-IQ Test! ${personality.emoji}

"${personality.shortRoast}"

Beat my score: ${shareUrl}`;
    
    const urls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(`I'm a certified ${personality.title} (${score}% on AI-IQ Test)`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    
    // Track copy event
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'copy_share_text', {
        event_category: 'engagement',
        value: score
      });
    }
    
    // Visual feedback
    const button = document.getElementById('copy-btn');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied! ✓';
      button.classList.add('bg-green-600');
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-600');
      }, 2000);
    }
  };

  // More specific roasts based on exact score
  const getDetailedRoast = () => {
    if (score === 100) return "Perfect score? Either you're an AI pretending to be human, or you need to go outside more. Probably both.";
    if (score === 0) return "You got 0%? That's actually impressive. It takes skill to be this wrong.";
    if (score >= 90) return "Your AI assistant has an AI assistant. You dream in Python. Your idea of a vacation is a hackathon.";
    if (score >= 80) return "You're the person who uses AI to write birthday cards. Your mother is disappointed but impressed.";
    if (score >= 70) return "You use AI like millennials use avocado toast - unnecessarily often but with confidence.";
    if (score >= 60) return "You know what ChatGPT is, which puts you ahead of your boss. That's... something.";
    if (score >= 50) return "You're at the perfect level: smart enough to use AI, not smart enough to automate your job away.";
    if (score >= 40) return "You still type 'www.' before every URL. Your kids are embarrassed for you.";
    if (score >= 30) return "You think AI is that movie with Will Smith. Close enough, I guess.";
    if (score >= 20) return "You still ask people to 'do the Google' for you. It's almost endearing.";
    if (score >= 10) return "Your computer still has a 'turbo' button. We found a fossil, everyone!";
    return "This score suggests you answered randomly. A cat walking on keyboard would score higher.";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Score Display */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Your AI-IQ Score</h1>
            <div className="relative inline-block">
              <div className={`text-8xl font-bold bg-gradient-to-r ${personality.color} bg-clip-text text-transparent`}>
                {score}%
              </div>
              <div className="text-xl text-gray-300 mt-2">
                {correct} out of {total} correct
              </div>
            </div>
          </div>

          {/* Personality Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{personality.emoji}</span>
              <div className={`text-3xl font-bold bg-gradient-to-r ${personality.color} bg-clip-text text-transparent`}>
                {personality.title}
              </div>
            </div>
            
            <p className="text-lg text-gray-100 mb-6 leading-relaxed">
              {personality.description}
            </p>
            
            {/* Detailed Roast */}
            <div className="border-t border-white/20 pt-6">
              <p className="text-yellow-400 text-lg italic">
                "{getDetailedRoast()}"
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-gray-400">Global Ranking</p>
                <p className="text-2xl font-bold text-cyan-400">{personality.ranking}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-gray-400">Your Level</p>
                <p className="text-2xl font-bold text-purple-400">{personality.title}</p>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              🔥 Challenge Your Friends
            </h2>
            
            {/* Share Preview */}
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">Your share message:</p>
              <pre className="text-cyan-300 text-sm whitespace-pre-wrap font-mono">
                {shareText}
              </pre>
            </div>

            {/* Copy Button */}
            <button
              id="copy-btn"
              onClick={copyToClipboard}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 mb-6"
            >
              📋 Copy Share Text
            </button>

            {/* Share Buttons Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleShare('twitter')}
                className="bg-black hover:bg-gray-900 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>𝕏</span> Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg transition-colors"
              >
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
              >
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('telegram')}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors"
              >
                Telegram
              </button>
              <button
                onClick={() => handleShare('reddit')}
                className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg transition-colors"
              >
                Reddit
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
              >
                Facebook
              </button>
            </div>

            {/* Challenge Link */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Direct challenge link:</p>
              <p className="text-cyan-400 text-sm break-all">{shareUrl}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                // Clear only test data, not statistics
                localStorage.removeItem('aiiq_score');
                localStorage.removeItem('aiiq_correct');
                localStorage.removeItem('aiiq_total');
                window.location.href = '/test';
              }}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              🔄 Retake Test
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              🏠 Back to Home
            </button>
          </div>

          {/* Bottom Tagline */}
          <div className="text-center mt-12 text-gray-400">
            <p className="text-sm">
              Think this result is wrong? That's exactly what someone with your score would say.
            </p>
            <p className="text-xs mt-2">
              For entertainment purposes only · Not a scientific assessment
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}