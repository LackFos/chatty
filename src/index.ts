import { configDotenv } from "dotenv";
import connectToDatabase from "@/database";
import startRestApiServer from "@/express.server";
import startWebSocketServer from "@/websocket.server";

configDotenv();

const startApp = async () => {
  try {
    await connectToDatabase();
    startWebSocketServer();
    startRestApiServer();
  } catch (error) {
    console.log(`💥 ${error}`);
  }
};

startApp();
