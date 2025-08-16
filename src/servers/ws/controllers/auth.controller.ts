import WebSocket from 'ws';
import jwt from 'jsonwebtoken';

import UserModel from '@/models/user.model';
import { userContext } from '@/servers/ws/server';
import { AuthenticateMessageInterface } from '@/servers/ws/dtos/chat.dto';
import { jwtSchema } from '@/interface';

export const authenticate = async (ws: WebSocket, message: AuthenticateMessageInterface) => {
  const context = userContext.get(ws);

  const decoded = jwt.decode(message.token);

  if (!decoded) return ws.close();

  const validatedJwt = jwtSchema.parse(decoded);

  const user = await UserModel.findByIdAndUpdate(validatedJwt.id, { isOnline: true }, { new: true });

  if (!user) return ws.close();

  context.user = user;
};
