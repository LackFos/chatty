import bcrypt from "bcrypt";
import express from "express";
import CustomError from "@/enums/CustomError";
import { createUserDto, userResponseDto } from "@/dto/user.dto";
import UserModel from "@/models/user-model";
import ResponseHelper from "@/helpers/ResponseHelper";

async function startRestApiServer() {
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
    throw Error(`${CustomError.REST_API_SERVER_SETUP_ERROR}: ${error}`);
  }
}

export default startRestApiServer;
