declare module 'catalog/CatalogPage' {
  import { ComponentType } from 'react';

  export interface CatalogProduct {
    id: number;
    name: string;
  }

  export interface CatalogPageProps {
    onAddToCart?: (product: CatalogProduct) => void;
  }

  const CatalogPage: ComponentType<CatalogPageProps>;
  export default CatalogPage;
}

declare module 'cart/CartPage' {
  import { ComponentType } from 'react';

  export interface CartItem {
    id: number;
    name: string;
    quantity: number;
  }

  export interface CartPageProps {
    items?: CartItem[];
  }

  const CartPage: ComponentType<CartPageProps>;
  export default CartPage;
}
