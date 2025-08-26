'use client';

import { useEffect, useState } from 'react';

export default function ResultPage() {
  const [score, setScore] = useState<number | null>(null);
  const [correct, setCorrect] = useState<number>(0);
  const [total, setTotal] = useState<number>(10);
  const [shareUrl, setShareUrl] = useState('');
  const [nickname, setNickname] = useState('');
  const [showNicknameInput, setShowNicknameInput] = useState(false);

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
      
      // Create base share URL
      const url = `${window.location.origin}/share?score=${scoreNum}`;
      setShareUrl(url);
    } else {
      // No score, redirect to test
      window.location.href = '/test';
    }
  }, []);

  if (score === null) {
    return <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />;
  }

  // Determine AI personality based on score
  const getPersonality = () => {
    if (score >= 90) return {
      title: "AI Overlord",
      color: "from-yellow-400 to-orange-500",
      description: "You don't use AI, you ARE the AI. Your brain runs on GPT-4 and your blood type is API+. While others Google 'how to use ChatGPT', you're already building your third AI startup. Honestly, we're scared of you."
    };
    if (score >= 70) return {
      title: "AI Native", 
      color: "from-purple-400 to-pink-500",
      description: "You speak fluent prompt engineering. Your idea of small talk is comparing Claude vs GPT benchmarks. Your browser has 47 AI tool tabs open right now. Touch grass occasionally."
    };
    if (score >= 40) return {
      title: "AI Tourist",
      color: "from-blue-400 to-cyan-500",
      description: "You use AI like a tourist uses Google Translate - functional but painful to watch. You still say 'Hey Siri' to ChatGPT sometimes. There's hope for you, barely."
    };
    return {
      title: "Digital Amish",
      color: "from-gray-400 to-gray-600",
      description: "You just discovered copy-paste last week and it blew your mind. Your password is still 'password123'. You print emails to read them better. We respect your commitment to tradition though."
    };
  };

  const personality = getPersonality();

  // More specific roasts based on score ranges
  const getRoast = () => {
    if (score === 100) return "Perfect score? Either you're an AI pretending to be human, or you need to go outside more. Probably both.";
    if (score >= 90) return "Your AI assistant has an AI assistant. You dream in Python. Your idea of a vacation is a hackathon.";
    if (score >= 80) return "You're the person who uses AI to write birthday cards. Your mother is disappointed but impressed.";
    if (score >= 70) return "You use AI like millennials use avocado toast - unnecessarily often but with confidence.";
    if (score >= 60) return "You know what ChatGPT is, which puts you ahead of your boss. That's... something.";
    if (score >= 50) return "You're at the perfect level: smart enough to use AI, not smart enough to automate your job away.";
    if (score >= 40) return "You still type 'www.' before every URL. Your kids are embarrassed for you.";
    if (score >= 30) return "You think AI is that movie with Will Smith. Close enough, I guess.";
    if (score >= 20) return "You still ask people to 'do the Google' for you. It's almost endearing.";
    if (score >= 10) return "Your computer still has a 'turbo' button. We found a fossil, everyone!";
    return "You got less than 10%? This test is multiple choice. A random clicking monkey would score higher. Impressive, honestly.";
  };

  // Global ranking (fake but believable)
  const getGlobalRanking = () => {
    if (score >= 90) return "Top 2% globally";
    if (score >= 80) return "Top 8% globally";
    if (score >= 70) return "Top 15% globally";
    if (score >= 60) return "Top 30% globally";
    if (score >= 50) return "Top 45% globally";
    if (score >= 40) return "Top 60% globally";
    return "Bottom 40% (there's nowhere to go but up!)";
  };

  // Update share URL with nickname
  const updateShareUrl = () => {
    const baseUrl = `${window.location.origin}/share?score=${score}`;
    const fullUrl = nickname ? `${baseUrl}&name=${encodeURIComponent(nickname)}` : baseUrl;
    setShareUrl(fullUrl);
    return fullUrl;
  };

  const handleShare = (platform: string) => {
    const url = updateShareUrl();
    const shareText = `I scored ${score}% on the AI-IQ Test! I'm a certified ${personality.title}. Think you can beat me?`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(url);
    
    const urls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const copyToClipboard = () => {
    const url = updateShareUrl();
    navigator.clipboard.writeText(url);
    alert('Challenge link copied! Send it to your friends!');
  };

  const handleGenerateImage = () => {
    const url = updateShareUrl();
    // Open the OG image in a new tab for preview/download
    window.open(`/api/og?score=${score}${nickname ? `&name=${encodeURIComponent(nickname)}` : ''}`, '_blank');
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
            <div className={`text-3xl font-bold mb-4 bg-gradient-to-r ${personality.color} bg-clip-text text-transparent`}>
              {personality.title}
            </div>
            <p className="text-lg text-gray-100 mb-6 leading-relaxed">
              {personality.description}
            </p>
            
            {/* Roast Section */}
            <div className="border-t border-white/20 pt-6">
              <p className="text-yellow-400 text-lg italic">
                "{getRoast()}"
              </p>
            </div>

            {/* Global Ranking */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Global Ranking</p>
              <p className="text-2xl font-bold text-cyan-400">{getGlobalRanking()}</p>
            </div>
          </div>

          {/* Share Section with Nickname Input */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              🔥 Challenge Your Friends
            </h2>
            
            {/* Nickname Input */}
            {!showNicknameInput ? (
              <button
                onClick={() => setShowNicknameInput(true)}
                className="w-full mb-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
              >
                ✨ Personalize Your Share
              </button>
            ) : (
              <div className="mb-6 space-y-4">
                <input
                  type="text"
                  placeholder="Enter your nickname (optional)"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-4 bg-black/30 rounded-lg text-white placeholder-gray-400"
                  maxLength={20}
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowNicknameInput(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGenerateImage}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    Preview Image
                  </button>
                </div>
              </div>
            )}
            
            {/* Challenge URL */}
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">Your unique challenge link:</p>
              <div className="flex items-center justify-between">
                <p className="text-cyan-400 truncate mr-4 text-sm">{shareUrl}</p>
                <button
                  onClick={copyToClipboard}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => handleShare('twitter')}
                className="bg-black hover:bg-gray-900 text-white py-3 px-4 rounded-lg transition-colors"
              >
                𝕏 / Twitter
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
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-400">
              💡 Tip: Add your nickname to make the share image more personal!
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                localStorage.clear();
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
              Think this result is wrong? That's exactly what someone with your score would say. 😏
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}