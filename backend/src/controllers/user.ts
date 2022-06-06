import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User, { IUser } from '../schemas/user';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';
import ErrorResponse from '../utils/errorResponse';

dotenv.config();

const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
    } else return next(new ErrorResponse('Invalid user data', 400));
  }
);

const authenticateUserByEmailAndPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
    } else return next(new ErrorResponse('Invalid email or password', 401));
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

const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user?._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else return next(new ErrorResponse('User not found', 404));
  }
);

const updateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) user.password = req.body.password;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser?._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(user._id ?? ''),
      });
    } else return next(new ErrorResponse('User not found', 404));
  }
);

export {
  authenticateUserByEmailAndPassword,
  authenticateGoogleUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
};
