export interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

export interface CartPageProps {
  items?: CartItem[];
}

const defaultItems: CartItem[] = [
  { id: 1, name: 'MacBook Pro', quantity: 1 },
  { id: 2, name: 'AirPods Pro', quantity: 2 },
];

export default function CartPage({ items }: CartPageProps) {
  const cartItems = items ?? defaultItems;

  return (
    <div>
      <h2>Cart Remote</h2>
      <p>This page is served from the cart micro frontend.</p>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} — qty: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
