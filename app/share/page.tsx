// app/share/page.tsx
import { Metadata } from 'next';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
): Promise<Metadata> {
  const score = searchParams.score || '50';
  const name = searchParams.name || '';
  
  // Generate OG image URL with parameters
  const ogImageUrl = `https://ai-iq.vercel.app/api/og?score=${score}${name ? `&name=${encodeURIComponent(name as string)}` : ''}`;
  
  // Determine personality for title
  const scoreNum = parseInt(score as string);
  let personality = "AI User";
  if (scoreNum >= 90) personality = "AI Overlord";
  else if (scoreNum >= 70) personality = "AI Native";
  else if (scoreNum >= 40) personality = "AI Tourist";
  else personality = "Digital Amish";

  const title = name 
    ? `${name} scored ${score}% on AI-IQ Test - ${personality}`
    : `I scored ${score}% on AI-IQ Test - ${personality}`;
  
  const description = `Think you can beat ${score}%? Take the AI-IQ test and find out if you're an AI genius or still using Internet Explorer!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://ai-iq.vercel.app',
      siteName: 'AI-IQ Test',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `AI-IQ Score: ${score}%`,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default function SharePage({ searchParams }: Props) {
  const score = searchParams.score || '50';
  const name = searchParams.name || '';
  
  // Redirect to home page with challenge parameter
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      window.location.href = `/?challenge=${score}`;
    }, 100);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          AI<span className="text-blue-400">-IQ</span> Test
        </h1>
        <p className="text-xl mb-8">
          {name ? `${name} scored ${score}%!` : `Someone scored ${score}%!`}
        </p>
        <p className="text-gray-300">
          Redirecting to the test...
        </p>
      </div>
    </main>
  );
}