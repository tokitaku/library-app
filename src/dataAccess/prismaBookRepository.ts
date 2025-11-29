import { PrismaClient, type Book } from "@prisma/client";
import type { BookRepositoryInterface } from "@/dataAccess/bookRepositoryInterface";

export class PrismaBookRepository implements BookRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(title: string): Promise<Book> {
    return await this.prisma.book.create({
      data: {
        title,
        isAvailable: true,
      },
    });
  }

  async findById(id: string): Promise<Book | null> {
    return await this.prisma.book.findUnique({
      where: { id },
    });
  }
}
