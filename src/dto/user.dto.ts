import * as z from "zod";

export const createUserDto = z.object({
  email: z.email(),
  password: z.string(),
});

export const userResponseDto = z.object({
  email: z.email(),
});
