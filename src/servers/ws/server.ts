import * as z from 'zod';
import jwt from 'jsonwebtoken';
import { WebSocketServer } from 'ws';

import AppSetupError from '@/enums/setup.error';
import ChatModel from '@/models/chat.model';
import UserModel, { UserInterface } from '@/models/user.model';
import { chatCreateRequest } from '@/servers/ws/dtos/chat.dto';
import messageType from '@/servers/ws/enums/message.type';

export const jwtPayloadSchema = z.object({
  id: z.string(),
  iat: z.number().int(),
});

const startWebSocketServer = () => {
  try {
    const port = process.env.WEB_SOCKET_SERVER_PORT as number | undefined;
    const wss = new WebSocketServer({ port });

    wss.on('connection', function (ws) {
      let user: UserInterface | null = null;

      ws.on('message', async function (data) {
        try {
          const rawData = JSON.parse(data.toString());
          const message = chatCreateRequest.parse(rawData);

          // Check if the user is authenticated
          const isAuthenticatequest = message.type === messageType.Authenticate;

          // If the user is not authenticated and the message is not an authentication request, close the connection
          if (!user && (!isAuthenticatequest || !message.token)) return ws.close();

          if (message.type === messageType.Authenticate) {
            const decoded = jwt.decode(message.token);

            if (!decoded) return ws.close();

            const validatedJwt = jwtPayloadSchema.parse(decoded);

            user = await UserModel.findOne({ _id: validatedJwt.id });
          }

          if (message.type === messageType.Chat) {
            await ChatModel.create(message);
          }
        } catch (error) {
          console.log(`💥 ${error}`);
        }
      });
    });

    console.log('⚡️ WebSocket server started on port 8080');
  } catch (error) {
    throw Error(`${AppSetupError.WEB_SOCKET_SERVER_SETUP_ERROR}: ${error}`);
  }
};

export default startWebSocketServer;
