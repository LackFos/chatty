import WebSocket, { WebSocketServer } from 'ws';

import onClose from '@/servers/ws/handlers/on-close';
import onMessage from '@/servers/ws/handlers/on-message';
import UserContext from '@/servers/ws/libs/user-context';
import SubscribeContext from '@/servers/ws/libs/subscribe-context';
import { UserContextInterface } from '@/servers/ws/interface';

export const subscribeContext = new SubscribeContext();
export const userContext = new UserContext<WebSocket, UserContextInterface>({ user: null });

const websocketServer = () => {
  try {
    const port = Number(process.env.WEB_SOCKET_SERVER_PORT);
    const wss = new WebSocketServer({ port });

    wss.on('connection', function (ws) {
      ws.on('message', (data) => onMessage(ws, data));
      ws.on('close', (code, reason) => onClose(ws));
    });

    console.log('⚡️ WebSocket server started on port 8080');
  } catch (error) {
    throw error;
  }
};

export default websocketServer;
