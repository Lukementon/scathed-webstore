import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  isAdmin?: boolean;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
