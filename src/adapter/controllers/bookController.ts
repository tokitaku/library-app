import { AddBookRequestDto } from "@/application/dtos/book/addBookRequestDto";
import { FindBookByIdRequestDto } from "@/application/dtos/book/findBookByIdRequestDto";
import { AddBookUseCaseInterface } from "@/application/usecases/book/addBookUseCaseInterface";
import { FindBookByIdUseCaseInterface } from "@/application/usecases/book/findByBookUseCaseInfterface";
import { Book } from "@/domain/entities/book";
import type { Request, Response } from "express";

export class BookController {
  constructor(
    private readonly addBookUseCase: AddBookUseCaseInterface,
    private readonly findBookByIdUseCase: FindBookByIdUseCaseInterface
  ) {}

  async addBook(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: AddBookRequestDto = {
        title: req.body.title as string,
      };
      const title = req.body.title as string;
      const newBook = await this.addBookUseCase.execute(requestDto);
      res.status(201).json(newBook);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add book" });
    }
  }

  async findBookById(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: FindBookByIdRequestDto = { id: req.params.id! };
      const foundBook = await this.findBookByIdUseCase.execute(requestDto);
      if (!foundBook) {
        res.status(404).json({ error: "Book not found" });
        return;
      }
      res.status(200).json(foundBook);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve book" });
    }
  }
}
