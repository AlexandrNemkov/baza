// Data-layer types for the Baza storefront catalog.
// Pure type definitions — no runtime code. Kept serializable so the same
// shapes can live in the mock JSON files (brands/categories/products).

/**
 * Placeholder image descriptor. Until real photography is wired in, each
 * "image" is just a swatch: a hex color plus an optional human label.
 */
export type ProductImage = {
  /** Hex string, e.g. "#E4E3DF". */
  color: string;
  label?: string;
  /** Optional photo URL. When absent, an art-directed plate is rendered. */
  src?: string;
};

/** A single FAQ entry on a product page. */
export type FaqItem = {
  q: string;
  a: string;
};

export type Brand = {
  slug: string;
  name: string;
  description: string;
  logo?: string;
  cover?: string;
  /** Направление / категория бренда, напр. «Минимализм», «Верхняя одежда». */
  specialization?: string;
  /** Город базирования, напр. «Москва». */
  city?: string;
  /** Год основания, напр. 2018. */
  founded?: number;
};

export type Category = {
  slug: string;
  name: string;
  /** Set on subcategories; points at the parent category slug. */
  parentSlug?: string;
  cover?: string;
};

/**
 * Size chart row. We model the chart as a flat list of labelled rows
 * ({ label, value }) rather than a column matrix. Rationale: it is the
 * simplest shape that stays fully JSON-serializable, renders directly as a
 * two-column table, and avoids the ragged-array bookkeeping of a grid.
 */
export type SizeChartRow = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  title: string;
  brandSlug: string;
  /** Top-level category slug. */
  category: string;
  /** Optional subcategory slug (its parentSlug must equal `category`). */
  subcategory?: string;
  /** Price in RUB, integer. */
  price: number;
  sizes: string[];
  /** Russian color names. */
  colors: string[];
  images: ProductImage[];
  description: string;
  composition: string;
  care: string;
  /**
   * Either a structured set of rows, or a plain string when a tabular chart
   * does not apply (e.g. accessories). Kept as a union per the spec.
   */
  sizeChart: SizeChartRow[] | string;
  faq: FaqItem[];
};
