type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders trusted JSON-LD structured data as a <script> tag.
 *
 * `data` is always our own static site/catalog content (never user input),
 * so injecting it as a raw script body is safe by construction. We use
 * dangerouslySetInnerHTML for this trusted JSON-LD only.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
