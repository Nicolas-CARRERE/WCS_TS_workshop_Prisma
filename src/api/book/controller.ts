import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import create from "./handlers/create";
import update from "./handlers/update";
import delete_ from "./handlers/delete";
import { BookHandlers } from "./interface";

const controller: BookHandlers = {
  getAll,
  getOne,
  create,
  update,
  delete: delete_,
};

export default controller;
