import React from "react";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  datePublished?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, url, image, type = "website", datePublished, author }) => {
  const structuredDataOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marketgod Academy",
    "url": "https://www.marketgodacademy.com",
    "logo": "https://www.marketgodacademy.com/images/logo.png",
    "sameAs": [
      "https://www.facebook.com/eyram.akpey",
      "https://www.instagram.com/eyram_dela",
      "https://www.youtube.com/@marketgodcommunity",
      "https://t.me/marketgodcommunity"
    ]
  };

  const structuredDataArticle = type === "article" ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "image": image,
    "datePublished": datePublished,
    "author": { "@type": "Person", "name": author },
    "publisher": { "@type": "Organization", "name": "Marketgod Academy", "logo": { "@type": "ImageObject", "url": "https://www.marketgodacademy.com/images/logo.png" } }
  } : null;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content="Marketgod Academy" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataOrg) }} />
      {structuredDataArticle && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataArticle) }} />}
    </>
  );
};

export default SEO;



