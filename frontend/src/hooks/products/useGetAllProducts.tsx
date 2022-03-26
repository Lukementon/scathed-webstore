import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/types';

const useGetAllProducts = () => {
  const [productsState, setProductsState] = useState<Product[]>();
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [productsError, setProductsError] = useState<Error | unknown>();

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get('/api/products');

        setProductsLoading(true);
        setProductsState(data);
        setProductsLoading(false);
      })();
    } catch (error) {
      if (error instanceof Error) {
        setProductsError(error?.message);
        setProductsLoading(false);
      }
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
