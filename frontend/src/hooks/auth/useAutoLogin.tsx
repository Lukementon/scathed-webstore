import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../state/user/user';

const useAutoLogin = () => {
  const setUser = useSetRecoilState(userState);
  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') ?? '')
    : undefined;
  useEffect(() => {
    setUser(userInfoFromStorage);
  }, [userInfoFromStorage, setUser]);
};

export default useAutoLogin;
export { useAutoLogin };
