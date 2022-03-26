import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/types';

const useSingleProduct = (productId: string) => {
  const [productState, setProductState] = useState<Product>();
  const [productLoading, setProductLoading] = useState<boolean | null>(null);
  const [productError, setProductError] = useState<Error | unknown>();

  useEffect(() => {
    (async () => {
      try {
        const { data: product } = await axios.get(`/api/products/${productId}`);
        setProductLoading(true);
        setProductState(product);
        setProductLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setProductError('An error occured while fetching this product');
          setProductLoading(false);
          return;
        }
        setProductError(error);
        setProductLoading(false);
      }
    })();
  }, []);

  return useMemo(
    () => ({
      product: productState,
      productLoading,
      productError,
    }),
    [productState, productLoading, productError]
  );
};

export default useSingleProduct;
export { useSingleProduct as useGetAllProducts };
