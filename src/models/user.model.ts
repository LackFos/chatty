import mongoose, { Schema } from 'mongoose';

export interface UserInterface {
  email: string;
  password: string;
  isOnline: boolean;
}

const schema = new Schema<UserInterface>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: true },
    isOnline: { type: Boolean, require: true },
  },
  {
    toJSON: { virtuals: true },
  },
);

const UserModel = mongoose.model<UserInterface>('User', schema);

export default UserModel;
