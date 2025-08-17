import WebSocket, { WebSocketServer } from 'ws';

import onMessage from '@/servers/ws/routes';
import UserModel from '@/models/user.model';
import UserContext from '@/servers/ws/libs/user-context';
import SubscribeContext from '@/servers/ws/libs/subscribe-context';
import { UserContextInterface } from '@/servers/ws/interface';

export const userContext = new UserContext<WebSocket, UserContextInterface>({ user: null });
export const subscribeContext = new SubscribeContext();

const websocketServer = () => {
  try {
    const port = Number(process.env.WEB_SOCKET_SERVER_PORT);
    const wss = new WebSocketServer({ port });

    wss.on('connection', function (ws) {
      ws.on('message', (data) => onMessage(ws, data));

      ws.on('close', async function () {
        if (userContext.has(ws)) {
          const context = userContext.get(ws);

          if (context.user) {
            await UserModel.findByIdAndUpdate(context.user._id, { isOnline: false });

            const topic = `user.${context.user._id}.status`;
            subscribeContext.publish(topic, 'false');
            subscribeContext.unsubscribeAll(topic);
          }
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
