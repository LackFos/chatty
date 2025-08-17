import WebSocket from 'ws';

import ChatModel from '@/models/chat.model';
import { subscribeContext, userContext } from '@/servers/ws/server';
import { ChatMessageInterface } from '@/servers/ws/dtos/chat.dto';

export const createChat = async (ws: WebSocket, message: ChatMessageInterface) => {
  const context = userContext.get(ws);
  const user = context.user;

  if (!user) {
    return ws.close();
  }

  if (!message.to) {
    return ws.close();
  }

  await ChatModel.create({ sender: user._id, receiver: user._id, text: message.text });

  // Send message to the target user
  const inboxTopic = `user.${message.to}.inbox`;
  subscribeContext.publish(inboxTopic, message.text);
};
