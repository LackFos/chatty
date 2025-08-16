import express from 'express';

import AppSetupError from '@/enums/setup.error';
import { errorHandler } from '@/middlewares/error.handler';
import { createUser, login } from '@/servers/http/controllers/user.controller';

const startHttpServer = async () => {
  try {
    const server = express();
    const port = process.env.REST_API_SERVER_PORT;

    server.use(express.json());

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

export default startHttpServer;
