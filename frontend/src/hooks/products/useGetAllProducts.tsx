import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { GET_PRODUCTS_ROUTE } from '../../constants/routes';
import { Product } from '../../types/types';

const useGetAllProducts = () => {
  const [productsState, setProductsState] = useState<Product[]>();
  const [productsLoading, setProductsLoading] = useState<boolean | null>(null);
  const [productsError, setProductsError] = useState<Error | unknown>();

  useEffect(() => {
    try {
      (async () => {
        const { data: products } = await axios.get(GET_PRODUCTS_ROUTE);

        setProductsLoading(true);
        setProductsState(products);
        setProductsLoading(false);
      })();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setProductsError(error?.message);
        setProductsLoading(false);
        return;
      }
      setProductsError(error);
      setProductsLoading(false);
    }
  }, []);

  return useMemo(
    () => ({
      products: productsState,
      loading: productsLoading,
      error: productsError,
    }),
    [productsState, productsLoading, productsError]
  );
};

export default useGetAllProducts;
export { useGetAllProducts };
