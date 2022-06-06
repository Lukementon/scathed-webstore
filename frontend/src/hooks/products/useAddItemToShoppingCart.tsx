import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { ShoppingCartItem, shoppingCartState } from '../../state/products/cart';
import { Product } from '../../types/types';

const useAddItemToShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);

  const addItemToShoppingCart = useCallback(
    (product: Product, size: string, quantity: string | number) => {
      const newProduct = {
        product,
        size,
        quantity,
      };

      const productExistsInCart = shoppingCart.find(
        (item: ShoppingCartItem) =>
          item.product._id === product._id && item.size === size
      );

      if (productExistsInCart) {
        setShoppingCart(
          shoppingCart.map((cartItem: ShoppingCartItem) =>
            cartItem.product._id === newProduct.product._id &&
            cartItem.size === newProduct.size
              ? newProduct
              : cartItem
          ) as ShoppingCartItem[]
        );
        return;
      }

      setShoppingCart([...shoppingCart, newProduct as ShoppingCartItem]);
    },
    [shoppingCart, setShoppingCart]
  );

  return useMemo(() => ({ addItemToShoppingCart }), [addItemToShoppingCart]);
};

export default useAddItemToShoppingCart;
export { useAddItemToShoppingCart };
