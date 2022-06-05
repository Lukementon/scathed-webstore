import { model, Schema } from 'mongoose';
import bcyrpt from 'bcryptjs';

export interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
  _id?: string;
  avatar?: string;
  password?: string;
  matchPassword?: (enteredPassword: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
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
    isAdmin: {
      required: true,
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcyrpt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcyrpt.genSalt(10);
  this.password = await bcyrpt.hash(this.password as string, salt);
});

const User = model<IUser>('User', UserSchema);
export default User;
