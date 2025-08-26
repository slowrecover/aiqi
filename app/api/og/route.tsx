// app/api/og/route.tsx
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get parameters from URL
    const score = searchParams.get('score') || '50';
    const nickname = searchParams.get('name') || '';
    
    const scoreNum = parseInt(score);
    
    // Determine personality based on score
    const getPersonality = (score: number) => {
      if (score >= 90) return {
        title: "AI OVERLORD",
        gradient: { from: '#FFD700', to: '#FF6B6B' },
      };
      if (score >= 70) return {
        title: "AI NATIVE",
        gradient: { from: '#A855F7', to: '#EC4899' },
      };
      if (score >= 40) return {
        title: "AI TOURIST",
        gradient: { from: '#3B82F6', to: '#06B6D4' },
      };
      return {
        title: "DIGITAL AMISH",
        gradient: { from: '#6B7280', to: '#374151' },
      };
    };
    
    // Get random roast based on score
    const getRoast = (score: number) => {
      const roasts: {[key: string]: string[]} = {
        "90-100": [
          "Your AI has an AI assistant. Concerning.",
          "You code in your sleep. Literally.",
          "The Matrix has you. And you love it.",
        ],
        "70-89": [
          "You use AI like millennials use avocado toast.",
          "Your browser has 47 AI tabs. This is fine.",
          "You prompt engineer your coffee order.",
        ],
        "40-69": [
          "You still say 'Hey Siri' to ChatGPT.",
          "AI judges your prompts. Silently.",
          "Google Translate is your idea of AI.",
        ],
        "0-39": [
          "Your VCR is still blinking 12:00.",
          "You print emails to read them better.",
          "Password123 is your password, isn't it?",
        ]
      };
      
      let range = "0-39";
      if (score >= 90) range = "90-100";
      else if (score >= 70) range = "70-89";
      else if (score >= 40) range = "40-69";
      
      const roastList = roasts[range];
      // Use score as seed for consistent roast
      return roastList[score % roastList.length];
    };
    
    const personality = getPersonality(scoreNum);
    const roast = getRoast(scoreNum);
    
    // Generate the image
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${personality.gradient.from}, ${personality.gradient.to})`,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Background decoration */}
          <div
            style={{
              position: 'absolute',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 50%)',
              display: 'flex',
            }}
          />
          
          {/* Logo */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: 'white',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            AI<span style={{ color: '#00ff88' }}>-IQ</span> TEST
          </div>
          
          {/* Nickname if provided */}
          {nickname && (
            <div
              style={{
                fontSize: 32,
                color: 'white',
                marginBottom: 20,
                opacity: 0.9,
                display: 'flex',
              }}
            >
              @{nickname}
            </div>
          )}
          
          {/* Score */}
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1,
              marginBottom: 20,
              textShadow: '0 10px 40px rgba(0,0,0,0.3)',
              display: 'flex',
            }}
          >
            {score}%
          </div>
          
          {/* Personality Badge */}
          <div
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '3px solid rgba(255,255,255,0.3)',
              borderRadius: 25,
              padding: '20px 50px',
              marginBottom: 40,
              display: 'flex',
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: 2,
              }}
            >
              {personality.title}
            </div>
          </div>
          
          {/* Roast */}
          <div
            style={{
              fontSize: 28,
              color: 'white',
              fontStyle: 'italic',
              textAlign: 'center',
              maxWidth: '80%',
              marginBottom: 40,
              opacity: 0.95,
              lineHeight: 1.4,
              display: 'flex',
            }}
          >
            "{roast}"
          </div>
          
          {/* Call to action */}
          <div
            style={{
              fontSize: 24,
              color: 'white',
              opacity: 0.9,
              marginTop: 20,
              display: 'flex',
            }}
          >
            Think you can beat {score}%? Try now →
          </div>
          
          {/* URL */}
          <div
            style={{
              fontSize: 28,
              color: 'white',
              opacity: 0.8,
              marginTop: 20,
              fontWeight: 600,
              display: 'flex',
            }}
          >
            ai-iq.vercel.app
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}