import { WebSocketServer } from "ws";
import CustomError from "@/enums/CustomError";
import { ChatModel } from "./models/chat-model";
import ChatSchema from "./schemas/chat-schema";

function startWebSocketServer() {
  try {
    const wss = new WebSocketServer({ port: 8080 });

    wss.on("connection", function (ws) {
      ws.on("message", async function (data) {
        try {
          const request = JSON.parse(data.toString());

          const validated = ChatSchema.parse(request);

          // Add the message to the database
          ChatModel.create(validated);
        } catch (error) {
          console.log(`💥 ${error}`);
        }
      });
    });

    console.log("⚡️ WebSocket server started on port 8080");
  } catch (error) {
    throw Error(`${CustomError.WEB_SOCKET_SERVER_SETUP_ERROR}: ${error}`);
  }
}

export default startWebSocketServer;
