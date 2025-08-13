import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "@/models/user.model";
import { createUserDto, userResponseDto } from "@/dtos/user.dto";
import ResponseHelper from "@/helpers/response.helper";

export const createUser = async (req: Request, res: Response) => {
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
};
