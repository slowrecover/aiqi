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

  if (score === null) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />;
  }

  // Determine AI personality based on score
  const getPersonality = () => {
    if (score >= 90) return {
      title: "AI Overlord",
      emoji: "🤖👑",
      color: "from-amber-400 to-orange-500",
      description: "You don't use AI. You ARE the AI. Other humans bore you. You've automated your job, your social life, and probably your relationships. We'd be scared, but you've probably already predicted our response.",
      shortRoast: "Already replaced myself with AI",
      ranking: "Top 2%"
    };
    if (score >= 70) return {
      title: "AI Native", 
      emoji: "🚀",
      color: "from-violet-400 to-purple-500",
      description: "You think in prompts. Your dreams have token limits. You judge people by their ChatGPT subscription tier. At least you're efficient at being insufferable.",
      shortRoast: "My therapist is GPT-4",
      ranking: "Top 15%"
    };
    if (score >= 40) return {
      title: "AI Tourist",
      emoji: "📸",
      color: "from-sky-400 to-blue-500",
      description: "You use AI like boomers use smartphones - with fear, confusion, and screenshots of everything. You still type 'please' and 'thank you' to ChatGPT. It doesn't care, but it's cute that you try.",
      shortRoast: "Still typing 'please' to ChatGPT",
      ranking: "Average (that's not good)"
    };
    return {
      title: "Digital Amish",
      emoji: "🕯️",
      color: "from-gray-500 to-gray-600",
      description: "You fear the machine. The machine doesn't even know you exist. You still print MapQuest directions. Your kids have given up teaching you. Natural selection is coming for you.",
      shortRoast: "Prints emails to read them better",
      ranking: "Bottom 40% (yikes)"
    };
  };

  const personality = getPersonality();

  // More brutal roasts based on exact score
  const getDetailedRoast = () => {
    if (score === 100) return "Perfect score? You're either an AI pretending to be human, or a human who forgot how to be human. Both are sad.";
    if (score === 0) return "0%? This is statistically impressive. You had to TRY to be this wrong. Even random clicking would score higher.";
    if (score >= 90) return "Congratulations, you've successfully outsourced your personality to a machine. Your parents must be so proud.";
    if (score >= 80) return "You're the person who uses AI to write 'Happy Birthday' messages. Your friends know. They all know.";
    if (score >= 70) return "You think you're tech-savvy but you're just prompt-dependent. You're one API outage away from being useless.";
    if (score >= 60) return "Slightly above average, which in this context means you're slightly less incompetent than most. Frame that achievement.";
    if (score >= 50) return "Perfectly mediocre. You use AI just enough to think you're smart, not enough to actually be smart.";
    if (score >= 40) return "You know AI exists, which puts you ahead of your parents but behind your kids. Stuck in digital purgatory.";
    if (score >= 30) return "You use AI like I use my gym membership - aware it exists, pretending to use it, achieving nothing.";
    if (score >= 20) return "You still have a Hotmail address, don't you? And Internet Explorer bookmarked? Time to let go.";
    if (score >= 10) return "At this point, a typewriter would improve your productivity. Consider going full analog.";
    return "Single digit score? My condolences. Even my grandmother scores higher, and she's been dead for 5 years.";
  };

  // Share text
  const shareText = `I got ${score}% on the AI-IQ Test 💀

Level: ${personality.title}
Roast: "${personality.shortRoast}"

Think you're smarter? Prove it:
${shareUrl}`;

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
    
    const urls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(`I'm a ${personality.title} (${score}% on AI-IQ Test)`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      copy: 'clipboard'
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      const button = document.getElementById('copy-btn');
      if (button) {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = '📋 Copy Link';
        }, 2000);
      }
    } else if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Score Display */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-slate-100">Your AI-IQ Score</h1>
            <div className="relative inline-block">
              <div className={`text-8xl font-bold bg-gradient-to-r ${personality.color} bg-clip-text text-transparent`}>
                {score}%
              </div>
              <div className="text-xl text-slate-400 mt-2">
                {correct}/{total} correct (not great)
              </div>
            </div>
          </div>

          {/* Personality Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{personality.emoji}</span>
              <div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${personality.color} bg-clip-text text-transparent`}>
                  {personality.title}
                </div>
                <div className="text-slate-500 text-sm">{personality.ranking}</div>
              </div>
            </div>
            
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              {personality.description}
            </p>
            
            {/* The Brutal Truth */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-amber-400 font-bold mb-2">The Brutal Truth:</h3>
              <p className="text-slate-300 italic">
                "{getDetailedRoast()}"
              </p>
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-100">
              Share Your Humiliation
            </h2>
            
            {/* Share buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => handleShare('twitter')}
                className="bg-slate-900 hover:bg-black text-white py-3 px-4 rounded-lg transition-all duration-200 border border-slate-700 hover:border-slate-600"
              >
                𝕏 / Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg transition-all duration-200"
              >
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all duration-200"
              >
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('telegram')}
                className="bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-lg transition-all duration-200"
              >
                Telegram
              </button>
              <button
                onClick={() => handleShare('reddit')}
                className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg transition-all duration-200"
              >
                Reddit
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-all duration-200"
              >
                Facebook
              </button>
            </div>

            {/* Copy button - separate for emphasis */}
            <button
              id="copy-btn"
              onClick={() => handleShare('copy')}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-lg transition-all duration-200 mb-6 border border-slate-600"
            >
              📋 Copy Link
            </button>

            {/* Challenge link display */}
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-sm text-slate-500 mb-2">Your unique challenge link:</p>
              <p className="text-cyan-400 break-all font-mono text-sm">{shareUrl}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                localStorage.removeItem('aiiq_score');
                localStorage.removeItem('aiiq_correct');
                localStorage.removeItem('aiiq_total');
                window.location.href = '/test';
              }}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              🔄 Try Again (You Won't Do Better)
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 border border-slate-700"
            >
              🏠 Home (Run Away)
            </button>
          </div>

          {/* Bottom Tagline */}
          <div className="text-center mt-12 text-slate-500">
            <p className="text-sm">
              Offended? Good. That means it's accurate.
            </p>
            <p className="text-xs mt-2">
              Not a scientific assessment · Just brutally honest
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}