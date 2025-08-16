import WebSocket from 'ws';

import ChatModel from '@/models/chat.model';
import { ChatMessageInterface } from '@/servers/ws/dtos/chat.dto';
import contextRegistry from '@/servers/ws/libs/context-registry';

export const createChat = async (ws: WebSocket, message: ChatMessageInterface) => {
  const context = contextRegistry.get(ws);
  const user = context.user;

  await ChatModel.create({
    sender: user._id,
    text: message.text,
  });
};
