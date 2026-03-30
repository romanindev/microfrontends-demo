import { lazy, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RemoteLoader from './components/RemoteLoader';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

import type { CatalogProduct } from 'catalog/CatalogPage';
import type { CartItem } from 'cart/CartPage';

const CatalogPage = lazy(() => import('catalog/CatalogPage'));
const CartPage = lazy(() => import('cart/CartPage'));

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: CatalogProduct) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);

      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  return (
    <Routes>
      <Route path="/" element={<MainLayout cartCount={cartCount} />}>
        <Route index element={<HomePage />} />
        <Route
          path="catalog"
          element={
            <RemoteLoader>
              <CatalogPage onAddToCart={handleAddToCart} />
            </RemoteLoader>
          }
        />
        <Route
          path="cart"
          element={
            <RemoteLoader>
              <CartPage items={cartItems} />
            </RemoteLoader>
          }
        />
      </Route>
    </Routes>
  );
}
