import { useCallback, useMemo } from 'react';

interface Output {
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostCode: string;
}

const useGetUserShippingAddress = () => {
  const getUserShippingAddress = useCallback(() => {
    const userShippingAddress: Output = localStorage.getItem(
      'userShippingAddress'
    )
      ? JSON.parse(localStorage.getItem('userShippingAddress') ?? '')
      : undefined;

    const { shippingAddress, shippingCity, shippingCountry, shippingPostCode } =
      userShippingAddress ?? {};

    return {
      shippingAddress,
      shippingCity,
      shippingCountry,
      shippingPostCode,
    };
  }, []);

  return useMemo(() => ({ getUserShippingAddress }), [getUserShippingAddress]);
};

export default useGetUserShippingAddress;
export { useGetUserShippingAddress };
