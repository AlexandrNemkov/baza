// Curated product collections (подборки). Each podborka pins a set of product
// slugs from the catalog, with a GEO-friendly intro paragraph that neuro-search
// engines can lift as a direct answer.

export type Podborka = {
  slug: string;
  title: string;
  /** Short card subtitle. */
  summary: string;
  /** Longer GEO-oriented intro paragraph shown on the landing page. */
  intro: string;
  /** Hand-picked product slugs, in display order. */
  productSlugs: string[];
};

export const PODBORKI: Podborka[] = [
  {
    slug: 'baza-na-vesnu',
    title: 'База на весну',
    summary: 'Лёгкие слои и спокойные цвета для межсезонья',
    intro:
      'База на весну — это компактный набор вещей, которые легко сочетаются между собой и закрывают переменчивую погоду межсезонья. В подборку вошли льняные и хлопковые рубашки, лёгкое платье и аксессуары спокойных оттенков от российских дизайнеров. Такой капсульный гардероб строится вокруг нейтральной палитры: молочный, песочный, серо-голубой — и работает по принципу слоёв, когда вещи можно надевать друг на друга и снимать по погоде.',
    productSlugs: [
      'volchok-rubashka-len-natural',
      'lesyanebo-rubashka-hlopok-utro',
      'lesyanebo-platye-shelk-zarya',
      'volchok-sumka-shopper-len',
      'lesyanebo-platok-shelk-sad',
    ],
  },
];

export function getAllPodborki(): Podborka[] {
  return PODBORKI;
}

export function getPodborka(slug: string): Podborka | undefined {
  return PODBORKI.find((p) => p.slug === slug);
}
