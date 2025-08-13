import bcrypt from "bcrypt";
import express from "express";
import AppSetupError from "@/enums/app.setup.error";
import { createUserDto, userResponseDto } from "@/dtos/user.dto";
import UserModel from "@/models/user.model";
import ResponseHelper from "@/helpers/response.helper";

const startRestApiServer = async () => {
  try {
    const server = express();
    const port = process.env.REST_API_SERVER_PORT;

    server.use(express.json());

    server.post("/register", async (req, res) => {
      const credentials = createUserDto.parse(req.body);

      const userExists = await UserModel.findOne({ email: credentials.email });

      if (userExists) {
        return ResponseHelper.unprocessableEntity(res, "Email already used");
      }

      const saltRounds = 10;

      bcrypt.hash(credentials.password, saltRounds, async function (error, hash) {
        if (error) throw Error(error.message);

        const createdUser = await UserModel.create({ email: credentials.email, password: hash });

        return ResponseHelper.success(res, "User created", userResponseDto.parse(createdUser));
      });
    });

    server.listen(port, () => {
      console.log(`⚡️ Rest API Server listening on port ${port}`);
    });
  } catch (error) {
    throw Error(`${AppSetupError.REST_API_SERVER_SETUP_ERROR}: ${error}`);
  }
};

export default startRestApiServer;
