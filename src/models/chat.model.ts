import mongoose, { Schema } from 'mongoose';

export interface ChatInterface {
  text: string;
}

const schema = new Schema<ChatInterface>({
  text: { type: String, required: true },
});

const ChatModel = mongoose.model<ChatInterface>('Chat', schema);

export default ChatModel;
