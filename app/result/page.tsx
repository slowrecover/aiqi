'use client';

import { useState, useEffect } from 'react';

export default function ResultPage() {
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [rank, setRank] = useState(0);
  const [personality, setPersonality] = useState('');
  const [shareText, setShareText] = useState('');
  const [roastMessage, setRoastMessage] = useState('');
  const [copied, setCopied] = useState(false);

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
    
    // Determine personality with ROASTS
    let personalityType = '';
    let roast = '';
    let shareMsg = '';
    
    if (scoreNum >= 80) {
      personalityType = 'AI Overlord';
      roast = "Damn, you actually speak fluent ChatGPT. Silicon Valley wants your number. Your prompts are so good, Claude gets nervous.";
      shareMsg = `I just destroyed the AI-IQ test with ${scoreNum}/100 🔥\nApparently I speak fluent ChatGPT.\nThink you're smarter? Prove it:`;
    } else if (scoreNum >= 60) {
      personalityType = 'AI Native';
      roast = "Not bad! You can hold a conversation with AI without embarrassing yourself. You're like that friend who claims they're 'pretty good at Excel'.";
      shareMsg = `Got ${scoreNum} on AI-IQ. Not bad for someone who still Googles 'how to use ChatGPT' 😅\nBet you can't beat me though:`;
    } else if (scoreNum >= 40) {
      personalityType = 'AI Tourist';
      roast = "You're trying! It's like watching your dad use TikTok - painful but endearing. At least you know ChatGPT isn't a crypto coin.";
      shareMsg = `AI-IQ Score: ${scoreNum}. I'm basically a boomer asking ChatGPT to 'please write email' 💀\nYou literally can't do worse:`;
    } else {
      personalityType = 'AI Caveman';
      roast = "Ouch. Your prompts are so bad, ChatGPT pretends to be offline. You probably still type 'www' before every URL.";
      shareMsg = `I scored ${scoreNum} on AI-IQ. My prompts are so bad, even ChatGPT asks ME for clarification 🤡\nBeat me (impossible challenge):`;
    }
    
    setPersonality(personalityType);
    setRoastMessage(roast);
    
    // Create share text with challenge URL
    const challengeUrl = `https://ai-iq.vercel.app?challenge=${scoreNum}&user=${Date.now()}`;
    const text = `${shareMsg}\n${challengeUrl}`;
    setShareText(encodeURIComponent(text));
  }, []);

  const handleShare = (platform: string) => {
    const challengeUrl = `https://ai-iq.vercel.app?challenge=${score}`;
    
    // Platform-specific share messages
    const messages: {[key: string]: string} = {
      twitter: getTwitterMessage(),
      linkedin: getLinkedInMessage(),
      whatsapp: getWhatsAppMessage(),
    };
    
    let url = '';
    
    switch(platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(messages.twitter)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(challengeUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(messages.whatsapp)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(challengeUrl)}&text=${encodeURIComponent(messages.twitter)}`;
        break;
    }
    
    window.open(url, '_blank');
  };

  const getTwitterMessage = () => {
    const challengeUrl = `https://ai-iq.vercel.app?challenge=${score}`;
    if (score >= 80) {
      return `Just demolished the AI-IQ test: ${score}/100 🔥\n\nI'm basically ChatGPT's best friend now.\n\nThink you know AI better? Doubt it: ${challengeUrl}`;
    } else if (score >= 60) {
      return `AI-IQ Score: ${score}/100\n\nNot terrible for someone who learned AI from YouTube shorts 😅\n\nBet you can't beat me: ${challengeUrl}`;
    } else if (score >= 40) {
      return `Got ${score} on AI-IQ 💀\n\nI use AI like my grandma uses smartphones - with fear and confusion.\n\nYou literally cannot do worse: ${challengeUrl}`;
    }
    return `AI-IQ: ${score}/100 🤡\n\nMy prompts are a crime against artificial intelligence.\n\nPlease, someone beat this embarrassing score: ${challengeUrl}`;
  };

  const getLinkedInMessage = () => {
    const challengeUrl = `https://ai-iq.vercel.app?challenge=${score}`;
    if (score >= 80) {
      return `Thrilled to announce I've scored ${score}/100 on the AI-IQ assessment! 🎯\n\nAs we navigate the AI revolution, continuous learning is key. How well do you understand AI?\n\nTest your knowledge: ${challengeUrl}\n\n#AI #ArtificialIntelligence #TechSkills #Innovation`;
    }
    return `Completed the AI-IQ test with ${score}/100. Room for growth in my AI journey! 📈\n\nTest your AI knowledge: ${challengeUrl}\n\n#AI #Learning #Technology`;
  };

  const getWhatsAppMessage = () => {
    const challengeUrl = `https://ai-iq.vercel.app?challenge=${score}`;
    if (score >= 60) {
      return `LOL just took an AI-IQ test and got ${score}/100! 🧠✨\n\nI'm basically an AI whisperer now 😎\n\nYou think you know ChatGPT better than me? Try: ${challengeUrl}`;
    }
    return `BRUH I got ${score}/100 on this AI test 💀💀\n\nI'm so bad at AI, Siri laughs at me\n\nYou can't possibly do worse lmao: ${challengeUrl}`;
  };

  const copyChallenge = () => {
    const challengeUrl = `https://ai-iq.vercel.app?challenge=${score}`;
    navigator.clipboard.writeText(challengeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = () => {
    if (score >= 80) return 'from-green-400 to-emerald-600';
    if (score >= 60) return 'from-blue-400 to-purple-600';
    if (score >= 40) return 'from-yellow-400 to-orange-600';
    return 'from-red-400 to-pink-600';
  };

  const getMotivationalRoast = () => {
    if (score >= 80) return "🏆 You're in the top 10%. The other 90% hate you.";
    if (score >= 60) return "💪 Above average. Like being the tallest person at a kids' party.";
    if (score >= 40) return "📈 You tried. Participation trophy incoming.";
    return "💀 This score should be illegal in 47 states.";
  };

  const getImprovementRoast = () => {
    if (score >= 80) {
      return [
        "• You could teach a masterclass (but please don't)",
        "• ChatGPT adds you as an emergency contact",
        "• Your prompts are chef's kiss perfect"
      ];
    } else if (score >= 60) {
      return [
        "• You know enough to be dangerous",
        "• AI tolerates your presence",
        "• Better than your Instagram captions at least"
      ];
    } else if (score >= 40) {
      return [
        "• Google 'how to talk to ChatGPT' immediately",
        "• Your prompts need therapy",
        "• AI is not that complicated, bestie"
      ];
    }
    return [
      "• Download the internet and start over",
      "• ChatGPT filed a restraining order",
      "• Have you tried turning your brain off and on again?"
    ];
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            AI<span className="text-blue-400">-IQ</span> Results
          </h1>
          <p className="text-gray-300">Time to face the truth...</p>
        </div>

        {/* Score Card */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            {/* Score Display */}
            <div className="mb-6">
              <div className={`text-8xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent animate-pulse`}>
                {score}
              </div>
              <div className="text-2xl text-gray-300 mt-2">out of 100</div>
            </div>

            {/* Personality Type */}
            <div className="mb-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {personality}
              </div>
              <div className="text-gray-300 px-4 italic">
                "{roastMessage}"
              </div>
            </div>

            {/* Motivational Roast */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <p className="text-xl font-semibold">{getMotivationalRoast()}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold">{correct}/{total}</div>
                <div className="text-sm text-gray-400">Correct</div>
                <div className="text-xs text-gray-500 mt-1">
                  {correct < 5 ? "Yikes" : correct < 8 ? "Meh" : "Nice"}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold">Top {rank}%</div>
                <div className="text-sm text-gray-400">Global Rank</div>
                <div className="text-xs text-gray-500 mt-1">
                  {rank <= 10 ? "Show off" : rank <= 50 ? "Decent" : "Room to grow"}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold">#{Math.floor(Math.random() * 900) + 100}</div>
                <div className="text-sm text-gray-400">Today</div>
                <div className="text-xs text-gray-500 mt-1">
                  Out of thousands
                </div>
              </div>
            </div>

            {/* Your AI Report Card */}
            <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-bold mb-3">📊 Your AI Report Card:</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Prompt Engineering</span>
                  <span className="text-yellow-400">
                    {score >= 80 ? "A+" : score >= 60 ? "B" : score >= 40 ? "C-" : "F"}
                    <span className="text-xs text-gray-400 ml-2">
                      {score >= 80 ? "(Nerd)" : score >= 60 ? "(Try-hard)" : "(Oof)"}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>AI Tool Knowledge</span>
                  <span className="text-yellow-400">
                    {score >= 70 ? "A" : score >= 50 ? "B-" : score >= 30 ? "D" : "F--"}
                    <span className="text-xs text-gray-400 ml-2">
                      {score >= 70 ? "(Pro)" : score >= 50 ? "(Rookie)" : "(Noob)"}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ChatGPT Friendship Level</span>
                  <span className="text-yellow-400">
                    {score >= 80 ? "BFF" : score >= 60 ? "Acquaintance" : score >= 40 ? "Stranger" : "Blocked"}
                  </span>
                </div>
              </div>
            </div>

            {/* Challenge Section */}
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 mb-6 border border-purple-500/30">
              <h3 className="font-bold text-lg mb-3">🔥 Challenge Your Friends</h3>
              <p className="text-sm text-gray-300 mb-3">
                {score >= 60 ? "Show off your big brain energy" : "Maybe they'll do worse (hopefully)"}
              </p>
              <button
                onClick={copyChallenge}
                className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg transition-all transform hover:scale-105 border border-white/20"
              >
                {copied ? "✓ Link Copied!" : "📋 Copy Challenge Link"}
              </button>
            </div>

            {/* Share Buttons - Now with personality */}
            <div className="mb-6">
              <p className="text-gray-400 mb-4 font-semibold">
                {score >= 60 ? "Flex on the timeline:" : "Embrace the shame:"}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="bg-black hover:bg-gray-900 px-4 py-3 rounded-lg transition-all transform hover:scale-105 font-semibold"
                >
                  𝕏 Post
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-3 rounded-lg transition-all transform hover:scale-105 font-semibold"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg transition-all transform hover:scale-105 font-semibold"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare('telegram')}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg transition-all transform hover:scale-105 font-semibold"
                >
                  Telegram
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all transform hover:scale-105"
              >
                Home
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/test';
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-lg transition-all font-bold transform hover:scale-105"
              >
                Retake (You need it)
              </button>
            </div>
          </div>
        </div>

        {/* Roast Tips Section */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-bold text-xl mb-3">
              {score >= 60 ? "🎯 Keep Dominating:" : "💊 Reality Check:"}
            </h3>
            <ul className="text-left space-y-2 text-gray-300">
              {getImprovementRoast().map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            
            {score < 60 && (
              <p className="mt-4 text-sm text-gray-400 italic">
                Pro tip: Actually reading about AI might help. Just saying.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}