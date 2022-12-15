import { BookHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const createBook: BookHandlers["create"] = async (req, res) => {
  try {
    const { title, author, collection } = req.body;

    const newBook = await prisma.book.create({
      data: {
        title,
        author: {
          connect: {
            name: author,
          },
        },
        collection: {
          connectOrCreate: {
            where: { name: collection },
            create: { name: collection },
          },
        },
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default createBook;
