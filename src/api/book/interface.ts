/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from "@prisma/client";
import { RequestHandler } from "express";
import { ResponseError } from "../../interfaces/globalTypes";

type BookBodyCreate = {
  title: string;
  author: string;
  collection: string;
};

export interface BookHandlers {
  getAll: RequestHandler<null, Book[] | ResponseError, null>;
  getOne: RequestHandler<{ id: string }, Book | ResponseError, null>;
  create: RequestHandler<null, Book | ResponseError, BookBodyCreate>;
  update: RequestHandler<{ id: string }, Book | ResponseError, BookBodyCreate>;
  delete: RequestHandler<{ id: string }, Book | ResponseError, null>;
}
