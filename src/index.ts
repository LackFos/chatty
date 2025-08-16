import { configDotenv } from 'dotenv';

import connectToDatabase from '@/database';
import startHttpServer from '@/servers/http/server';
import startWebSocketServer from '@/servers/ws/server';

configDotenv();

const startApp = async () => {
  try {
    await connectToDatabase();
    startHttpServer();
    startWebSocketServer();
  } catch (error) {
    console.log(`💥 ${error}`);
  }
};

startApp();
