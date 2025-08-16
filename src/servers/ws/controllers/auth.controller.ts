import jwt from 'jsonwebtoken';
import WebSocket from 'ws';

import UserModel from '@/models/user.model';
import contextRegistry from '@/servers/ws/libs/context-registry';
import { AuthenticateMessageInterface } from '@/servers/ws/dtos/chat.dto';
import { jwtSchema } from '@/interface';

export const authenticate = async (ws: WebSocket, message: AuthenticateMessageInterface) => {
  const context = contextRegistry.get(ws);

  const decoded = jwt.decode(message.token);

  if (!decoded) return ws.close();

  const validatedJwt = jwtSchema.parse(decoded);

  context.user = await UserModel.findByIdAndUpdate(validatedJwt.id, { isOnline: true }, { new: true });
};
