import mongoose, { Schema } from "mongoose";

interface UserInterface {
  email: string;
  password: string;
}

const schema = new Schema<UserInterface>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: true },
  },
  {
    toJSON: { virtuals: true },
  }
);

const UserModel = mongoose.model<UserInterface>("User", schema);

export default UserModel;
