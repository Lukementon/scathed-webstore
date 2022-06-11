import { useCallback, useMemo } from 'react';

const useSaveUserShippingAddress = () => {
  const saveUserShippingAddress = useCallback(props => {
    localStorage.setItem('userShippingAddress', JSON.stringify(props));
  }, []);

  return useMemo(
    () => ({ saveUserShippingAddress }),
    [saveUserShippingAddress]
  );
};

export default useSaveUserShippingAddress;
export { useSaveUserShippingAddress };
