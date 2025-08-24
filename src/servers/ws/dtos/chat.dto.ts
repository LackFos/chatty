import { z } from 'zod';

export const createChatRequest = z.object({
  sender: z.string(),
  receiver: z.string(),
  text: z.string(),
});
