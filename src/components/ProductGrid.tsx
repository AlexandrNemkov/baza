import type { Product } from '@/data/types';
import ProductCard from './ProductCard';

/** Responsive grid of product cards (2/3/4 cols via `.grid-products`). */
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid-products">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
