import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../schemas/user';
import dotenv from 'dotenv';

dotenv.config();

const googleClient = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});
console.log('**** google client', googleClient);

const authenticateUser = async (req: Request, res: Response) => {
  console.log('--- in the auth controller ---', req);
  const { token } = req?.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: `${process.env.GOOGLE_CLIENT_ID}`,
  });

  const payload = ticket.getPayload();

  let user = await User.findOne({ email: payload?.email });
  if (!user) {
    user = await new User({
      email: payload?.email,
      avatar: payload?.picture,
      name: payload?.name,
      isAdmin: false,
    });

    await user.save();
  }

  res.json({ user, token });
};

export default authenticateUser;
