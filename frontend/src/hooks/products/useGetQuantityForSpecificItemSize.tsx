import { useEffect, useMemo, useState } from 'react';
import { CountInStock } from '../../types/types';

const useGetQuantityForSpecificItemSize = (
  countInStock: CountInStock[],
  size: string
) => {
  const [quantityArray, setQuantityArray] = useState<number[] | undefined>();

  useEffect(() => {
    const availableQuantitiesForEachSize = Object.fromEntries(
      countInStock.map(el => [el.size, el.stock])
    );

    const quantityForSelectedSize = Object.entries(
      availableQuantitiesForEachSize
    ).find(key => key[0] === size);

    setQuantityArray(
      Array.from(
        { length: quantityForSelectedSize?.[1] as number },
        (_, i) => i + 1
      )
    );
  }, [countInStock, size]);

  return useMemo(() => quantityArray, [quantityArray]);
};

export default useGetQuantityForSpecificItemSize;
export { useGetQuantityForSpecificItemSize };
