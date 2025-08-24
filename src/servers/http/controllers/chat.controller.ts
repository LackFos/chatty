import { NextFunction, Request, Response } from 'express';

import ChatModel from '@/models/chat.model';
import { getAllChatsResponse } from '@/servers/http/dtos/chat.dto';
import ResponseHelper, { BadRequestError } from '../helpers/response.helper';

export const getAllChats = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const filters: Record<string, any> = {};

    if (request.query.userId) {
      filters['sender'] = request.query.userId;
    }

    const chats = await ChatModel.find(filters).populate('sender');

    const data = getAllChatsResponse.parse(chats);

    if (data.length === 0) {
      return ResponseHelper.success(response, 'No chats available', data);
    }

    return ResponseHelper.success(response, 'Chats available', data);
  } catch (error) {
    next(error);
  }
};
