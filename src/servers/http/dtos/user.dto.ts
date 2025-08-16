import * as z from "zod";

export const userCreateRequest = z.object({
  email: z.email(),
  password: z.string(),
});

export const userCreateResponse = z.object({
  email: z.email(),
});

export const userLoginRequest = z.object({
  email: z.email(),
  password: z.string(),
});

export const userLoginResponse = z.object({
  email: z.email(),
  token: z.string(),
});
