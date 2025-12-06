import type { Book } from "@/domain/entities/book";
import { TransactionContextInterface } from "@/domain/utils/transactionContextInterface";

export interface BookRepositoryInterface {
  create(book: Book, ctx?: TransactionContextInterface): Promise<Book>;
  findBookById(
    id: string,
    ctx?: TransactionContextInterface
  ): Promise<Book | null>;
  update(book: Book, ctx?: TransactionContextInterface): Promise<Book>;
}
