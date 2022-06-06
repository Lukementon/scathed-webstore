import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../state/user/user';

interface LoginInput {
  email: string;
  password: string;
}

const useFormLogin = () => {
  const setUser = useSetRecoilState(userState);
  const [formLoading, setFormLoading] = useState(false);
  const [formLoginError, setFormLoginError] = useState<Error | unknown>();

  const loginWithForm = useCallback(
    async ({ email, password }: LoginInput) => {
      setFormLoginError(undefined);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        setFormLoading(true);
        const { data: userLoginData } = await axios.post(
          '/api/users/login',
          {
            email,
            password,
          },
          config
        );
        localStorage.setItem('userInfo', JSON.stringify(userLoginData));
        setFormLoading(false);
        setUser(userLoginData);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setFormLoginError(error.response.data.error);
          console.error(error);
        } else {
          setFormLoginError('Error logging in');
          console.error(error);
        }
      }
    },
    [setUser]
  );

  return useMemo(
    () => ({ formLoading, formLoginError, loginWithForm }),
    [formLoading, formLoginError, loginWithForm]
  );
};

export default useFormLogin;
export { useFormLogin };
