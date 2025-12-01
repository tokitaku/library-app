import { PrismaBookRepository } from "@/adapter/repositories/prismaBookRepository";
import { BookController } from "@/adapter/controllers/bookController";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { UuidGenerator } from "@/adapter/utils/uuidGnerator";
import { AddBookUseCase } from "@/application/usecases/book/addBookUseCase";
import { bookRoutes } from "@/infrastructure/web/routers/bookRouter";
import { FindByBookUseCase } from "@/application/usecases/book/findByBookUseCase";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
const uuidGenrator = new UuidGenerator();

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenrator);
const findBookByIdUseCase = new FindByBookUseCase(bookRepository);

const bookController = new BookController(addBookUseCase, findBookByIdUseCase);
app.use("/books", bookRoutes(bookController));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
