import WebSocket, { WebSocketServer } from 'ws';

import UserModel from '@/models/user.model';
import onMessage from '@/servers/ws/routes';
import contextRegistry from '@/servers/ws/libs/context-registry';
import { SubscribeContext, UserContext } from '@/servers/ws/interface';

export const userContext = new contextRegistry<WebSocket, UserContext>({ user: null });
export const subscribeContext = new contextRegistry<WebSocket, SubscribeContext>({});

const websocketServer = () => {
  try {
    const port = Number(process.env.WEB_SOCKET_SERVER_PORT);
    const wss = new WebSocketServer({ port });

    wss.on('connection', function (ws) {
      ws.on('message', async function (data) {
        onMessage(ws, data);
      });

      ws.on('close', async function () {
        const context = userContext.get(ws);

        if (context.user) {
          await UserModel.findByIdAndUpdate(context.user._id, { isOnline: false });
        }

        userContext.delete(ws);
      });
    });

    console.log('⚡️ WebSocket server started on port 8080');
  } catch (error) {
    throw error;
  }
};

export default websocketServer;
