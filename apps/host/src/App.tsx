import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import RemoteLoader from "./components/RemoteLoader";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

import { safeLazy } from "./utils/safeLazy";

import type { CatalogProduct } from "catalog/CatalogPage";
import type { CartItem } from "cart/CartPage";

const CatalogPage = safeLazy(() => import("catalog/CatalogPage"), 'CatalogPage');
const CartPage = safeLazy(() => import("cart/CartPage"), 'CartPage');

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: CatalogProduct) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  return (
    <Routes>
      <Route path="/" element={<MainLayout cartCount={cartCount} />}>
        <Route index element={<HomePage />} />
        <Route
          path="catalog"
          element={
          <ErrorBoundary fallback={<div>Catalog crashed</div>}>
            <RemoteLoader fallback="Loading catalog...">
              <CatalogPage onAddToCart={handleAddToCart} />
            </RemoteLoader>
          </ErrorBoundary>
          }
        />
        <Route
          path="cart"
          element={
            <ErrorBoundary fallback={<div>Cart crashed</div>}>
            <RemoteLoader fallback="Loading cart...">
              <CartPage items={cartItems} />
            </RemoteLoader>
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>
  );
}
