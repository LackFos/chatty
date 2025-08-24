import { z } from 'zod';

export const getAllChatsResponse = z.array(
  z.object({
    id: z.string(),
    text: z.string(),
    sender: z.object({
      id: z.string(),
      email: z.string(),
      isOnline: z.boolean(),
    }),
  }),
);
