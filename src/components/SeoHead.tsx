import Head from 'next/head';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export default function SeoHead({ 
  title, 
  description, 
  keywords = [], 
  image = 'https://aefoniq.com/og-image.jpg', // Default image
  url = 'https://aefoniq.com' 
}: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}