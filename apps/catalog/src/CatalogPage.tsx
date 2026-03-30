export interface CatalogProduct {
  id: number;
  name: string;
}

export interface CatalogPageProps {
  onAddToCart?: (product: CatalogProduct) => void;
}

const products: CatalogProduct[] = [
  { id: 1, name: 'MacBook Pro' },
  { id: 2, name: 'iPhone 15' },
  { id: 3, name: 'AirPods Pro' },
];

export default function CatalogPage({ onAddToCart }: CatalogPageProps) {
  return (
    <div>
      <h2>Catalog Remote</h2>
      <p>This page is served from the catalog micro frontend.</p>

      <ul style={{ display: 'grid', gap: '12px', padding: 0, listStyle: 'none' }}>
        {products.map(product => (
          <li
            key={product.id}
            style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px' }}
          >
            <div style={{ marginBottom: '8px', fontWeight: 600 }}>{product.name}</div>

            <button onClick={() => onAddToCart?.(product)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
