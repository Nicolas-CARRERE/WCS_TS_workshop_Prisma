import prisma from "../../../../prisma/client";
import { BookHandlers } from "../interface";

const updateBook: BookHandlers["update"] = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, collection } = req.body;

    const book = await prisma.book.update({
      where: {
        id,
      },
      data: {
        title,
        author: {
          connect: {
            name: author,
          },
        },

        collection: {
          connect: {
            name: collection,
          },
        },
      },
    });
    res.status(200).json(book);
  } catch (error) {
    console.log(console.log(error));
    res.status(500).json({ message: error });
  }
};

export default updateBook;
