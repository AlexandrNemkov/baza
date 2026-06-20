import { SITE } from './config';
import { getBrand } from '@/data';
import type { Product } from '@/data/types';

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  };
}

export function product(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: p.description,
    brand: {
      '@type': 'Brand',
      name: getBrand(p.brandSlug)?.name ?? p.brandSlug,
    },
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function breadcrumb(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: SITE.url + item.href,
    })),
  };
}

export function faq(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function itemList(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: SITE.url + '/product/' + p.slug,
    })),
  };
}
