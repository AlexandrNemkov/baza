import { describe, it, expect } from 'vitest';
import {
  organization,
  product,
  breadcrumb,
  faq,
  itemList,
} from '../jsonld';
import { SITE } from '../config';
import { getBrand } from '@/data';
import type { Product } from '@/data/types';

const sample: Product = {
  slug: 'volchok-rubashka-len-natural',
  title: 'Льняная рубашка «Натурель»',
  brandSlug: 'volchok',
  category: 'odezhda',
  subcategory: 'rubashki',
  price: 7900,
  sizes: ['XS', 'S'],
  colors: ['Молочный'],
  images: [{ color: '#E4E3DF', label: 'Общий вид' }],
  description: 'Описание рубашки.',
  composition: '100% лён',
  care: 'Стирка 30°',
  sizeChart: 'таблица',
  faq: [{ q: 'Вопрос?', a: 'Ответ.' }],
};

describe('organization (existing, sanity)', () => {
  it('still emits Organization', () => {
    const o = organization();
    expect(o['@context']).toBe('https://schema.org');
    expect(o['@type']).toBe('Organization');
  });
});

describe('product()', () => {
  it('emits a Product with brand and offer', () => {
    const ld = product(sample);
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('Product');
    expect(ld.name).toBe(sample.title);
    expect(ld.description).toBe(sample.description);
    expect(ld.brand).toEqual({
      '@type': 'Brand',
      name: getBrand('volchok')?.name ?? 'volchok',
    });
    expect(ld.offers).toEqual({
      '@type': 'Offer',
      price: 7900,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    });
  });

  it('falls back to brandSlug when brand is unknown', () => {
    const ld = product({ ...sample, brandSlug: 'no-such-brand' });
    expect((ld.brand as { name: string }).name).toBe('no-such-brand');
  });
});

describe('breadcrumb()', () => {
  it('emits a BreadcrumbList with 1-based positions in order', () => {
    const ld = breadcrumb([
      { name: 'Главная', url: 'https://x/' },
      { name: 'Одежда', url: 'https://x/odezhda' },
      { name: 'Рубашка', url: 'https://x/odezhda/r' },
    ]);
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://x/' },
      { '@type': 'ListItem', position: 2, name: 'Одежда', item: 'https://x/odezhda' },
      { '@type': 'ListItem', position: 3, name: 'Рубашка', item: 'https://x/odezhda/r' },
    ]);
  });
});

describe('faq()', () => {
  it('emits a FAQPage with Question/Answer entries', () => {
    const ld = faq([
      { q: 'Вопрос 1?', a: 'Ответ 1.' },
      { q: 'Вопрос 2?', a: 'Ответ 2.' },
    ]);
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('FAQPage');
    expect(ld.mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'Вопрос 1?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ответ 1.' },
      },
      {
        '@type': 'Question',
        name: 'Вопрос 2?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ответ 2.' },
      },
    ]);
  });
});

describe('itemList()', () => {
  it('emits an ItemList with 1-based positions and product urls', () => {
    const ld = itemList([sample, { ...sample, slug: 'other', title: 'Другая' }]);
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('ItemList');
    expect(ld.itemListElement).toEqual([
      {
        '@type': 'ListItem',
        position: 1,
        name: sample.title,
        url: SITE.url + '/product/volchok-rubashka-len-natural',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Другая',
        url: SITE.url + '/product/other',
      },
    ]);
  });
});
