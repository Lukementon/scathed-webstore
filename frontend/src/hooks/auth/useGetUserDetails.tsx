import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/user/user';

const useGetUserDetails = () => {
  const [user, setUser] = useRecoilState(userState);
  const [getUserDetailsLoading, setGetUserDetailsLoading] = useState(false);
  const [getUserDetalsError, setGetUserDetalsError] = useState<
    Error | unknown
  >();

  const getUserDetails = useCallback(async () => {
    setGetUserDetalsError(undefined);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      };

      setGetUserDetailsLoading(true);
      const { data: userDetails } = await axios('/api/users/profile', config);
      setGetUserDetailsLoading(false);
      setUser(userDetails);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setGetUserDetalsError(error.response.data.error);
        console.error(error);
      } else {
        setGetUserDetalsError('Error getting user details');
        console.error(error);
      }
    }
  }, [user?.token, setUser]);

  return useMemo(
    () => ({
      getUserDetailsLoading,
      getUserDetalsError,
      getUserDetails,
    }),
    [getUserDetailsLoading, getUserDetalsError, getUserDetails]
  );
};

export default useGetUserDetails;
export { useGetUserDetails as useUpdateUserDetals };
