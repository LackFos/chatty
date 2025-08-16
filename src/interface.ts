import { z } from 'zod';

export const jwtSchema = z.object({
  id: z.string(),
  iat: z.number().int(),
});
