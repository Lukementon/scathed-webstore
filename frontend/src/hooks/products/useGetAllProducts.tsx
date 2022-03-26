import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/types';

const useGetAllProducts = () => {
  const [productsState, setProductsState] = useState<Product[]>();
  const [productsLoading, setProductsLoading] = useState<boolean | null>(null);
  const [productsError, setProductsError] = useState<Error | unknown>();

  useEffect(() => {
    (async () => {
      try {
        const { data: products } = await axios.get('/api/products');
        setProductsLoading(true);
        setProductsState(products);
        setProductsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setProductsError('An error occured while fetching products');
          setProductsLoading(false);
          return;
        }
        setProductsError(error);
        setProductsLoading(false);
      }
    })();
  }, []);

  return useMemo(
    () => ({
      products: productsState,
      productsLoading,
      productsError,
    }),
    [productsState, productsLoading, productsError]
  );
};

export default useGetAllProducts;
export { useGetAllProducts };
