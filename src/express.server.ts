import { createUser } from "./controllers/user.controller";
import express from "express";
import AppSetupError from "@/enums/app.setup.error";

const startRestApiServer = async () => {
  try {
    const server = express();
    const port = process.env.REST_API_SERVER_PORT;

    server.use(express.json());

    server.post("/register", createUser);

    server.listen(port, () => {
      console.log(`⚡️ Rest API Server listening on port ${port}`);
    });
  } catch (error) {
    throw Error(`${AppSetupError.REST_API_SERVER_SETUP_ERROR}: ${error}`);
  }
};

export default startRestApiServer;
