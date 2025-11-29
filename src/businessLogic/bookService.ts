import { PrismaBookRepository } from "@/dataAccess/prismaBookRepository.js";
import type { Book } from "@prisma/client";

export class BookService {
  private bookRepository: PrismaBookRepository;

  constructor() {
    this.bookRepository = new PrismaBookRepository();
  }

  async addBook(title: string): Promise<Book> {
    return await this.bookRepository.create(title);
  }

  async findBookById(id: string): Promise<Book | null> {
    return await this.bookRepository.findById(id);
  }
}
