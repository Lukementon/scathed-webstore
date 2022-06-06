import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

function useUrlParams(): URLSearchParams {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location.search]);
}

export { useUrlParams };
export default useUrlParams;
