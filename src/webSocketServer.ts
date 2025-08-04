import { WebSocketServer } from "ws";
import CustomError from "@/enums/CustomError";

function startWebSocketServer() {
  try {
    const wss = new WebSocketServer({ port: 8080 });

    wss.on("connection", function (ws) {
      ws.on("message", function (data) {
        console.log("received: %s", data);
      });
    });

    console.log("⚡️ WebSocket server started on port 8080");
  } catch (error) {
    throw Error(`${CustomError.WEB_SOCKET_SERVER_SETUP_ERROR}: ${error}`);
  }
}

export default startWebSocketServer;
