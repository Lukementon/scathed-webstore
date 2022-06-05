import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User, { IUser } from '../schemas/user';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';

dotenv.config();

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user?._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id ?? ''),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const authenticateUserByEmailAndPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.matchPassword && (await user.matchPassword(password))) {
      res.json({
        _id: user?._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id ?? ''),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }
);

const authenticateGoogleUser = asyncHandler(
  async (req: Request, res: Response) => {
    const googleClient = new OAuth2Client({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
    });

    const { token } = req?.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: `${process.env.GOOGLE_CLIENT_ID}`,
    });

    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload?.email });

    if (!user) {
      user = await User.create({
        name: payload?.name,
        email: payload?.email,
        isAdmin: false,
        avatar: payload?.picture,
      });
    }

    res.json({
      _id: user?._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  }
);

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user?._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authenticateUserByEmailAndPassword,
  authenticateGoogleUser,
  getUserProfile,
  registerUser,
};
