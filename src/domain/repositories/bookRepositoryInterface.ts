import type { Book } from "@/domain/entities/book";

export interface BookRepositoryInterface {
  create(book: Book): Promise<Book>;
  findBookById(id: string): Promise<Book | null>;
}
