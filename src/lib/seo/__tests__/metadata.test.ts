import { describe, it, expect } from 'vitest';
import { buildMetadata } from '../metadata';
import { SITE } from '../config';

describe('buildMetadata', () => {
  it('uses provided title and description', () => {
    const meta = buildMetadata({
      title: 'Custom Title',
      description: 'Custom desc',
      path: '/product/x',
    });
    expect(meta.title).toBe('Custom Title');
    expect(meta.description).toBe('Custom desc');
  });

  it('falls back to SITE defaults when title/description omitted', () => {
    const meta = buildMetadata({ path: '/' });
    expect(meta.title).toBe(SITE.title);
    expect(meta.description).toBe(SITE.description);
  });

  it('always enforces noindex robots, even with only a path', () => {
    const meta = buildMetadata({ path: '/' });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it('keeps noindex robots even when a custom title is given', () => {
    const meta = buildMetadata({ title: 'Whatever', path: '/product/x' });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it('sets canonical to SITE.url + path', () => {
    expect(buildMetadata({ path: '/product/x' }).alternates?.canonical).toBe(
      'https://alexandrnemkov.github.io/baza/product/x',
    );
    expect(buildMetadata({ path: '/' }).alternates?.canonical).toBe(
      SITE.url + '/',
    );
  });

  it('builds openGraph with website type and canonical url', () => {
    const meta = buildMetadata({
      title: 'OG Title',
      description: 'OG desc',
      path: '/product/x',
    });
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.type).toBe('website');
    expect(og.title).toBe('OG Title');
    expect(og.description).toBe('OG desc');
    expect(og.url).toBe(SITE.url + '/product/x');
    expect(og.siteName).toBe(SITE.name);
    expect(og.locale).toBe(SITE.locale);
  });

  it('builds twitter summary_large_image card', () => {
    const meta = buildMetadata({
      title: 'TW Title',
      description: 'TW desc',
      path: '/product/x',
    });
    const tw = meta.twitter as Record<string, unknown>;
    expect(tw.card).toBe('summary_large_image');
    expect(tw.title).toBe('TW Title');
    expect(tw.description).toBe('TW desc');
  });
});
