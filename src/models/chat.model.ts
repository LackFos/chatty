import mongoose, { Schema } from 'mongoose';

export interface ChatInterface {
  sender: Schema.Types.ObjectId;
  text: string;
}

const schema = new Schema<ChatInterface>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
});

const ChatModel = mongoose.model<ChatInterface>('Chat', schema);

export default ChatModel;
