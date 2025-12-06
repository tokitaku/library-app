import { PrismaBookRepository } from "@/adapter/repositories/prismaBookRepository";
import { BookController } from "@/adapter/controllers/bookController";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { UuidGenerator } from "@/adapter/utils/uuidGnerator";
import { AddBookUseCase } from "@/application/usecases/book/addBookUseCase";
import { bookRoutes } from "@/infrastructure/web/routers/bookRouter";
import { FindByBookUseCase } from "@/application/usecases/book/findByBookUseCase";
import { PrismaUserRepository } from "@/adapter/repositories/prismaUserRepository";
import { CreateUserUseCase } from "@/application/user/usecases/user/createUserUseCase";
import { UserController } from "@/adapter/controllers/userController";
import { userRoutes } from "@/infrastructure/web/routers/userRouter";
import { PrismaLoanRepository } from "@/adapter/repositories/prismaLoanRepository";
import { LoanBookUseCase } from "@/application/usecases/loan/loanBookUseCase";
import { ReturnBookUseCase } from "@/application/usecases/loan/returnBookUseCase";
import { loanRoutes } from "@/infrastructure/web/routers/loanRouter";
import { LoanController } from "@/adapter/controllers/loanController";
import { PrismaTransactionManager } from "@/adapter/utils/prismaTransactionManager";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
const uuidGenrator = new UuidGenerator();
const transactionManager = new PrismaTransactionManager(prisma);

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenrator);
const findBookByIdUseCase = new FindByBookUseCase(bookRepository);
const loanRepository = new PrismaLoanRepository(prisma);
const loanBookUseCase = new LoanBookUseCase(
  loanRepository,
  bookRepository,
  uuidGenrator,
  transactionManager
);
const returnBookUseCase = new ReturnBookUseCase(
  loanRepository,
  bookRepository,
  transactionManager
);
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository, uuidGenrator);

const userController = new UserController(createUserUseCase);
const bookController = new BookController(addBookUseCase, findBookByIdUseCase);
const loanController = new LoanController(loanBookUseCase, returnBookUseCase);

app.use("/books", bookRoutes(bookController));
app.use("/users", userRoutes(userController));
app.use("/loans", loanRoutes(loanController));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
