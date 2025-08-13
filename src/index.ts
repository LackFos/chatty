import { configDotenv } from "dotenv";
import connectToDatabase from "@/database";
import startWebSocketServer from "@/web-socket-server";
import startRestApiServer from "./rest-api-server";

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
