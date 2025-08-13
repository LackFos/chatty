import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UserModel from "@/models/user.model";
import { userCreateRequest, userCreateResponse, userLoginRequest, userLoginResponse } from "@/dtos/user.dto";
import ResponseHelper from "@/helpers/response.helper";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const saltRounds = 10;

    const credentials = userCreateRequest.parse(req.body);

    // Check is the email already used
    const userExists = await UserModel.findOne({ email: credentials.email });

    if (userExists) {
      return ResponseHelper.unprocessableEntity(res, "Email already used");
    }

    // Create new user with hashed password
    const passwordHash = await bcrypt.hash(credentials.password, saltRounds);

    const createdUser = await UserModel.create({ email: credentials.email, password: passwordHash });

    return ResponseHelper.success(res, "User created", userCreateResponse.parse(createdUser));
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return ResponseHelper.internalServerError(res, "JWT secret is not found");
    }

    const credentials = userLoginRequest.parse(req.body);

    // Get matching user by email
    const matchedUser = await UserModel.findOne({ email: credentials.email });

    if (!matchedUser) {
      return ResponseHelper.unauthorized(res, "Invalid login credentials");
    }

    const isPasswordMatched = await bcrypt.compare(credentials.password, matchedUser.password);

    if (!isPasswordMatched) {
      return ResponseHelper.unauthorized(res, "Invalid login credentials");
    }

    const token: string = jwt.sign({ id: matchedUser.id }, jwtSecret);

    return ResponseHelper.success(res, "Login successful", userLoginResponse.parse({ ...matchedUser.toJSON(), token }));
  } catch (error) {
    next(error);
  }
};
