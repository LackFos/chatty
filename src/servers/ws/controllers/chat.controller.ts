import WebSocket from 'ws';

import ChatModel from '@/models/chat.model';
import UserModel from '@/models/user.model';
import { subscribeContext, userContext } from '@/servers/ws/server';
import { ChatMessageInterface } from '@/servers/ws/dtos/chat.dto';

export const createChat = async (ws: WebSocket, message: ChatMessageInterface) => {
  const context = userContext.get(ws);
  const user = context.user!;

  const receiver = await UserModel.findOne({ email: message.to });

  if (!receiver) {
    return ws.send(JSON.stringify({ type: 'error', message: 'User not found' }));
  }

  await ChatModel.create({ sender: user._id, receiver: user._id, text: message.text });

  // Send message to the target user
  const inboxTopic = `user.${receiver._id}.inbox`;
  subscribeContext.publish(inboxTopic, message.text);
};
