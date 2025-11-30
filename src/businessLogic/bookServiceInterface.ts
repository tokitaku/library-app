import { Book } from "@prisma/client";

export interface BookServiceInterface {
  addBook(title: string): Promise<Book>;
  findBookById(id: string): Promise<Book | null>;
}
