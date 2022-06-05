import { IUser } from '../../schemas/user';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
