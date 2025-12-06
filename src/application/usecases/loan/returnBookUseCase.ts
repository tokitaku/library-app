import { LoanRepositoryInterface } from "@/domain/repositories/loanRepositoryInterface";
import { Loan } from "@/domain/entities/loan";
import { ReturnBookRequestDto } from "@/application/dtos/loan/returnBookRequestDto";
import { ReturnBookResponseDto } from "@/application/dtos/loan/returnBookResponseDto";
import { ReturnBookUseCaseInterface } from "@/application/usecases/loan/returnBookUseCaseInterface";
import { BookRepositoryInterface } from "@/domain/repositories/bookRepositoryInterface";
import { TransactionManagerInterface } from "@/application/utils/transactionManagerInterface";

export class ReturnBookUseCase implements ReturnBookUseCaseInterface {
  constructor(
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly transactionManager: TransactionManagerInterface
  ) {}

  async execute(
    requestDto: ReturnBookRequestDto
  ): Promise<ReturnBookResponseDto> {
    return await this.transactionManager.run(async (ctx) => {
      const loan = await this.loanRepository.findById(requestDto.id, ctx);
      if (!loan) {
        throw new Error("Loan not found");
      }
      const book = await this.bookRepository.findBookById(loan.bookId, ctx);
      if (!book) {
        throw new Error("Book not found");
      }
      book.returnBook();
      await this.bookRepository.update(book, ctx);
      loan.returnBook();
      const updatedLoan = await this.loanRepository.update(loan, ctx);

      return {
        id: updatedLoan.id,
        returnDate: updatedLoan.returnDate,
        createdAt: updatedLoan.createdAt,
        updatedAt: updatedLoan.updatedAt,
      };
    });
  }
}
