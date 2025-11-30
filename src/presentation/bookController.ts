import type { Request, Response } from "express";
import { BookServiceInterface } from "@/businessLogic/bookServiceInterface";

export class BookController {
  constructor(private readonly bookService: BookServiceInterface) {}

  async addBook(req: Request, res: Response): Promise<void> {
    try {
      const title = req.body.title as string;
      const newBook = await this.bookService.addBook(title);
      res.status(201).json(newBook);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add book" });
    }
  }

  async findBookById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const book = await this.bookService.findBookById(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to find book" });
    }
  }
}
