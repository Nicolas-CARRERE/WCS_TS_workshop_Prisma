import { BookHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const createBook: BookHandlers["create"] = async (req, res) => {
  try {
    const { title, author, collection } = req.body;
    const book = await prisma.book.create({
      data: {
        title,
        author: {
          connect: {
            id: author,
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

    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default createBook;
