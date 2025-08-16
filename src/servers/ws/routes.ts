import WebSocket from 'ws';

import { subscribeContext, userContext } from '@/servers/ws/server';
import { createChat } from '@/servers/ws/controllers/chat.controller';
import { authenticate } from '@/servers/ws/controllers/auth.controller';
import { clientMessage } from '@/servers/ws/dtos/chat.dto';
import messageType from '@/servers/ws/enums/message.type';

const onMessage = (ws: WebSocket, data: WebSocket.RawData) => {
  try {
    const context = userContext.get(ws);
    const user = context.user;

    const rawData = data.toString();
    const message = clientMessage.parse(JSON.parse(rawData));

    // Terminate Connection if user is not authenticated
    if (!user && (message.type !== messageType.Authenticate || !message.token)) {
      return ws.close();
    }

    // Authentication Handler
    if (message.type === messageType.Authenticate) {
      authenticate(ws, message);
    }

    // Chat Handler
    if (user && message.type === messageType.Chat) {
      createChat(ws, message);
    }

    // Subscribe Handler
    if (user && message.type === messageType.Subscribe) {
      const context = subscribeContext.get(ws);
      const existingTopic = context[message.topic] ?? [];
      context[message.topic] = [...existingTopic, ws];
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default onMessage;
