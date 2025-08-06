import { WebSocketServer } from "ws";
import CustomError from "@/enums/CustomError";
import { ChatModel } from "./models/chat-model";

function startWebSocketServer() {
  try {
    const wss = new WebSocketServer({ port: 8080 });

    wss.on("connection", function (ws) {
      ws.on("message", async function (data) {
        try {
          const request = JSON.parse(data.toString());

          // Check if the request has the required fields
          if (!request.text) {
            throw new Error("⚠️ Text value is required");
          }

          // Add the message to the database
          ChatModel.create({ text: request.text });
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
