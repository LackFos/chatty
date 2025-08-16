import { configDotenv } from 'dotenv';

import connectToDatabase from '@/database';
import httpServer from '@/servers/http/server';
import websocketServer from '@/servers/ws/server';

configDotenv();

const startApp = async () => {
  try {
    await connectToDatabase();
    httpServer();
    websocketServer();
  } catch (error) {
    console.log(`💥 ${error}`);
  }
};

startApp();
