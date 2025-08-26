// app/api/og/route.tsx
import { ImageResponse } from '@vercel/og';
 
export const runtime = 'edge';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const score = searchParams.get('score') || '50';
  const name = searchParams.get('name') || '';
  
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #7c3aed, #3b82f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 60, marginBottom: 20 }}>AI-IQ TEST</div>
        {name && <div style={{ fontSize: 40, marginBottom: 20 }}>@{name}</div>}
        <div style={{ fontSize: 150, fontWeight: 'bold' }}>{score}%</div>
        <div style={{ fontSize: 30, marginTop: 20 }}>Think you can beat it?</div>
        <div style={{ fontSize: 25, marginTop: 30, opacity: 0.8 }}>ai-iq.vercel.app</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}