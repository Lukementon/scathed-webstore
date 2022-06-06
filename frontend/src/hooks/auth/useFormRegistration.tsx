import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../state/user/user';

interface RegistrationInput {
  email: string;
  name: string;
  password: string;
}

const useFormRegistration = () => {
  const setUser = useSetRecoilState(userState);
  const [registrationFormLoading, setRegistrationFormLoading] = useState(false);
  const [formRegistrationError, setFormRegistrationError] = useState<
    Error | unknown
  >();

  const registerWithForm = useCallback(
    async ({ email, name, password }: RegistrationInput) => {
      setFormRegistrationError(undefined);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        setRegistrationFormLoading(true);
        const { data: userRegistrationData } = await axios.post(
          '/api/users',
          {
            email,
            name,
            password,
          },
          config
        );
        localStorage.setItem('userInfo', JSON.stringify(userRegistrationData));
        setRegistrationFormLoading(false);
        setUser(userRegistrationData);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setFormRegistrationError(error.response.data.error);
          console.error(error);
        } else {
          setFormRegistrationError('Error signing up');
          console.error(error);
        }
      }
    },
    [setUser]
  );

  return useMemo(
    () => ({
      formLoading: registrationFormLoading,
      formRegistrationError,
      registerWithForm,
    }),
    [registrationFormLoading, formRegistrationError, registerWithForm]
  );
};

export default useFormRegistration;
export { useFormRegistration as useFormLogin };
