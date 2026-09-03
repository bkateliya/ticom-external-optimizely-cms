export function JsonLdSchema({
  data,
}: {
  data: {
    "@context": "https://schema.org";
    "@type": string;
    [key: string]: unknown;
  };
}) {
  const jsonLd = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
