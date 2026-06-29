import { describe, it, expect } from 'vitest';
import { sampleImage } from '../sampleImage';
import { asset } from '../basePath';
const p = { slug:'lnyanaya-rubashka', subcategory:'rubashki', category:'odezhda' } as any;
describe('sampleImage', () => {
  it('детерминирован и отдаёт локальный путь /img/pNN.jpg', () => {
    expect(sampleImage(p,0)).toMatch(/\/img\/p\d{2}\.jpg$/);
    expect(sampleImage(p,0)).toBe(sampleImage(p,0));
    expect(sampleImage(p,0).startsWith(asset(''))).toBe(true);
  });
  it('разные индексы → разные фото', () => {
    expect(sampleImage(p,0)).not.toBe(sampleImage(p,1));
  });
  it('номер в диапазоне p01..p16', () => {
    for (let i=0;i<20;i++){
      const m = sampleImage({slug:'x'+i} as any, i).match(/p(\d{2})\.jpg$/);
      const n = Number(m![1]);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(16);
    }
  });
});
