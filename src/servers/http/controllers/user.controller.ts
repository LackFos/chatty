import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import UserModel from '@/models/user.model';
import ResponseHelper, { InternalServerError, UnauthorizedError } from '@/servers/http/helpers/response.helper';
import { userCreateRequest, userCreateResponse, userLoginRequest, userLoginResponse } from '@/servers/http/dtos/user.dto';

export const createUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const saltRounds = 10;

    const credentials = userCreateRequest.parse(request.body);

    // Check is the email already used
    const userExists = await UserModel.findOne({ email: credentials.email });

    if (userExists) {
      return next(new UnauthorizedError('Email already used'));
    }

    // Create new user with hashed password
    const passwordHash = await bcrypt.hash(credentials.password, saltRounds);

    const createdUser = await UserModel.create({
      email: credentials.email,
      password: passwordHash,
    });

    return ResponseHelper.success(response, 'User created', userCreateResponse.parse(createdUser));
  } catch (error) {
    next(error);
  }
};

export const login = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return next(new InternalServerError());
    }

    const credentials = userLoginRequest.parse(request.body);

    // Get matching user by email
    const matchedUser = await UserModel.findOne({ email: credentials.email }).select('+password');

    if (!matchedUser) {
      return next(new UnauthorizedError('Invalid login credentials'));
    }

    // Check if the password is correct
    const isPasswordMatched = await bcrypt.compare(credentials.password, matchedUser.password);

    if (!isPasswordMatched) {
      return next(new UnauthorizedError('Invalid login credentials'));
    }

    const token: string = jwt.sign({ id: matchedUser.id }, jwtSecret);

    return ResponseHelper.success(response, 'Login successful', userLoginResponse.parse({ ...matchedUser.toJSON(), token }));
  } catch (error) {
    next(error);
  }
};
