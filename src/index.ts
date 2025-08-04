import { configDotenv } from "dotenv";
import connectToDatabase from "./database";
import startWebSocketServer from "./webSocketServer";

configDotenv();

const startApp = async () => {
  try {
    await connectToDatabase();
    startWebSocketServer();
  } catch (error) {
    console.log(`💥 ${error}`);
  }
};

startApp();
