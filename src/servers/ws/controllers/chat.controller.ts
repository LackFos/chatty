import WebSocket from 'ws';

import ChatModel from '@/models/chat.model';
import { ChatMessageInterface } from '@/servers/ws/dtos/chat.dto';
import { userContext } from '@/servers/ws/server';

export const createChat = async (ws: WebSocket, message: ChatMessageInterface) => {
  const context = userContext.get(ws);
  const user = context.user;

  if (user) {
    await ChatModel.create({ sender: user._id, text: message.text });
  }
};
