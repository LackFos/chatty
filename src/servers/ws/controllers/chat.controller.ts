import WebSocket from 'ws';

import ChatModel from '@/models/chat.model';
import { ChatMessageInterface } from '@/servers/ws/dtos/chat.dto';

export const createChat = async (ws: WebSocket, message: ChatMessageInterface) => {
  await ChatModel.create(message);
};
