import WebSocket from 'ws';

import contextRegistry from '@/servers/ws/libs/context-registry';
import { createChat } from '@/servers/ws/controllers/chat.controller';
import { authenticate } from '@/servers/ws/controllers/auth.controller';
import { clientMessage } from '@/servers/ws/dtos/chat.dto';
import messageType from '@/servers/ws/enums/message.type';

const onMessage = (ws: WebSocket, data: WebSocket.RawData) => {
  try {
    const context = contextRegistry.get(ws);
    const user = context.user;

    const rawData = data.toString();
    const message = clientMessage.parse(JSON.parse(rawData));

    if (!user && (message.type !== messageType.Authenticate || !message.token)) {
      return ws.close();
    }

    if (message.type === messageType.Authenticate) {
      authenticate(ws, message);
    }

    if (message.type === messageType.Chat) {
      createChat(ws, message);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default onMessage;
