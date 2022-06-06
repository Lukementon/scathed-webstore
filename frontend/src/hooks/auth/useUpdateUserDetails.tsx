import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/user/user';

interface RegistrationInput {
  email: string;
  name: string;
  password: string;
}

const useUpdateUserDetals = () => {
  const [user, setUser] = useRecoilState(userState);
  const [userUpdateLoading, setUserUpdateLoading] = useState(false);
  const [userUpdateError, setUserUpdateError] = useState<Error | unknown>();

  const updateUser = useCallback(
    async ({ email, name, password }: RegistrationInput) => {
      setUserUpdateError(undefined);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        };

        setUserUpdateLoading(true);
        const { data: updatedUserData } = await axios.put(
          '/api/users/profile',
          {
            email,
            name,
            password,
          },
          config
        );
        localStorage.setItem('userInfo', JSON.stringify(updatedUserData));
        setUserUpdateLoading(false);
        setUser(updatedUserData);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setUserUpdateError(error.response.data.error);
          console.error(error);
        } else {
          setUserUpdateError('Error updating details');
          console.error(error);
        }
      }
    },
    [user?.token, setUser]
  );

  return useMemo(
    () => ({
      userUpdateLoading,
      userUpdateError,
      updateUser,
    }),
    [userUpdateLoading, userUpdateError, updateUser]
  );
};

export default useUpdateUserDetals;
export { useUpdateUserDetals };
