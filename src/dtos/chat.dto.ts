import * as z from "zod";

const createChatDto = z.object({
  text: z.string(),
});

export default createChatDto;
