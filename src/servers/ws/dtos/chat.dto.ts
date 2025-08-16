import { z } from 'zod';
import messageType from '@/servers/ws/enums/message.type';

export interface ChatMessageInterface {
  type: messageType.Chat;
  text: string;
}

export interface AuthenticateMessageInterface {
  type: messageType.Authenticate;
  token: string;
}

export const clientMessage = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(messageType.Chat),
    text: z.string(),
  }),
  z.object({
    type: z.literal(messageType.Authenticate),
    token: z.string(),
  }),
]);
