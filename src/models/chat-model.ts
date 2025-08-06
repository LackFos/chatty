import mongoose, { Schema } from "mongoose";

interface IChat {
  text: string;
}

const schema = new Schema<IChat>({
  text: { type: String, required: true },
});

export const ChatModel = mongoose.model<IChat>("Chat", schema);
