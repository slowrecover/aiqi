// app/api/og/route.tsx
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const score = searchParams.get('score') || '50';
    
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 60,
            background: 'linear-gradient(to bottom, purple, blue)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <div>AI-IQ TEST</div>
          <div style={{ fontSize: 120, fontWeight: 'bold', marginTop: 20 }}>
            {score}%
          </div>
          <div style={{ fontSize: 30, marginTop: 20 }}>
            Think you can beat it?
          </div>
          <div style={{ fontSize: 24, marginTop: 30, opacity: 0.8 }}>
            ai-iq.vercel.app
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.error('OG Image generation error:', e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}