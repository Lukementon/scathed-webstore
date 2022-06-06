import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { GoogleLoginResponse } from 'react-google-login';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/user/user';

const useGoogleLogin = () => {
  const setUser = useRecoilState(userState)[1];
  const [googleLoginError, setGoogleLoginError] = useState<Error | unknown>();
  const loginWithGoogle = useCallback(
    async (googleData: GoogleLoginResponse) => {
      try {
        const { data: googleUserLoginData } = await axios.post(
          '/api/users/login/google',
          {
            token: googleData?.tokenId,
          }
        );
        localStorage.setItem('userInfo', JSON.stringify(googleUserLoginData));
        setUser(googleUserLoginData);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setGoogleLoginError(error.response.data.error);
          console.error(error);
        } else {
          setGoogleLoginError('Error logging in');
          console.error(error);
        }
      }
    },
    [setUser]
  );

  return useMemo(
    () => ({ googleLoginError, loginWithGoogle, setGoogleLoginError }),
    [googleLoginError, loginWithGoogle, setGoogleLoginError]
  );
};

export default useGoogleLogin;
export { useGoogleLogin };
