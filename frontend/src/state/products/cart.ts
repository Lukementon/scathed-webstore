import { atom } from 'recoil';
import { Product } from '../../types/types';

export interface ShoppingCartItem {
  product: Product;
  size: string;
  quantity: number;
}

const shoppingCartState = atom<ShoppingCartItem[]>({
  key: 'shoppingCartState',
  default: [],
});

export { shoppingCartState };
