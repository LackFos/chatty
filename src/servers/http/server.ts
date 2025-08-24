import express from 'express';

import errorHandler from '@/middlewares/error.middleware';
import { createUser, login } from '@/servers/http/controllers/user.controller';
import { getAllChats } from '@/servers/http/controllers/chat.controller';
import AppSetupError from '@/enums/app-error.enum';

const httpServer = async () => {
  try {
    const server = express();
    const port = process.env.REST_API_SERVER_PORT;

    server.use(express.json());

    server.get('/chats', getAllChats);

    server.post('/register', createUser);
    server.post('/login', login);

    server.use(errorHandler);

    server.listen(port, () => {
      console.log(`⚡️ Rest API Server listening on port ${port}`);
    });
  } catch (error) {
    throw Error(`${AppSetupError.REST_API_SERVER_SETUP_ERROR}: ${error}`);
  }
};

export default httpServer;
