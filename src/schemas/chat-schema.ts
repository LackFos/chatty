import * as z from "zod";

const ChatSchema = z.object({
  text: z.string(),
});

export default ChatSchema;
