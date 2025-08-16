import * as z from 'zod';
import messageType from '@/servers/ws/enums/message.type';

export const chatCreateRequest = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(messageType.Chat),
    text: z.string(),
  }),
  z.object({
    type: z.literal(messageType.Authenticate),
    token: z.string(),
  }),
]);

export default chatCreateRequest;
