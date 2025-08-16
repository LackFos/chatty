import { UserInterface } from './../../../models/user.model';
import jwt from 'jsonwebtoken';
import WebSocket from 'ws';

import UserModel from '@/models/user.model';
import contextRegistry from '@/servers/ws/libs/context-registry';
import { jwtPayloadSchema } from '@/servers/ws/server';
import { AuthenticateMessageInterface } from '@/servers/ws/dtos/chat.dto';

export const authenticate = async (ws: WebSocket, message: AuthenticateMessageInterface) => {
  const context = contextRegistry.get(ws);

  const decoded = jwt.decode(message.token);

  if (!decoded) return ws.close();

  const validatedJwt = jwtPayloadSchema.parse(decoded);

  context.user = await UserModel.findOne({ _id: validatedJwt.id });
};
