import { atom } from 'recoil';

export interface IUser {
  name: string | null;
  email: string | null;
  _id: string | null;
  isAdmin: boolean | null;
  token: string | null;
  avatar?: string | null;
}

const userState = atom<IUser | undefined>({
  key: 'userState',
  default: {
    name: null,
    email: null,
    _id: null,
    isAdmin: null,
    token: null,
  },
});

export { userState };
