import * as z from 'zod';
import { WebSocketServer } from 'ws';

import onMessage from '@/servers/ws/routes';
import AppSetupError from '@/enums/setup.error';
import contextRegistry from '@/servers/ws/libs/context-registry';

export const jwtPayloadSchema = z.object({
  id: z.string(),
  iat: z.number().int(),
});

const startWebSocketServer = () => {
  try {
    const port = Number(process.env.WEB_SOCKET_SERVER_PORT);

    const wss = new WebSocketServer({ port });

    wss.on('connection', function (ws) {
      const context = contextRegistry.get(ws);
      context.user = null;

      ws.on('message', async function (data) {
        onMessage(ws, data);
      });
    });

    console.log('⚡️ WebSocket server started on port 8080');
  } catch (error) {
    throw Error(`${AppSetupError.WEB_SOCKET_SERVER_SETUP_ERROR}: ${error}`);
  }
};

export default startWebSocketServer;
