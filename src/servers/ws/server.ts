import { WebSocketServer } from 'ws';

import onMessage from '@/servers/ws/routes';
import AppSetupError from '@/enums/app-error.enum';
import contextRegistry from '@/servers/ws/libs/context-registry';

const websocketServer = () => {
  try {
    const port = Number(process.env.WEB_SOCKET_SERVER_PORT);

    const wss = new WebSocketServer({ port });

    wss.on('connection', function (ws) {
      const context = contextRegistry.get(ws);
      context.user = null;

      ws.on('message', async function (data) {
        onMessage(ws, data);
      });

      ws.on('close', function () {
        contextRegistry.delete(ws);
      });
    });

    console.log('⚡️ WebSocket server started on port 8080');
  } catch (error) {
    throw error;
  }
};

export default websocketServer;
