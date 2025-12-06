import { LoanRepositoryInterface } from "@/domain/repositories/loanRepositoryInterface";
import { Loan } from "@/domain/entities/loan";
import { LoanBookRequestDto } from "@/application/dtos/loan/loanBookRequestDto";
import { LoanBookResponseDto } from "@/application/dtos/loan/loanBookResponseDto";
import { LoanBookUseCaseInterface } from "@/application/usecases/loan/loanBookUseCaseInterface";
import { BookRepositoryInterface } from "@/domain/repositories/bookRepositoryInterface";
import { IdGeneratorInterface } from "@/domain/utils/idGeneratorInterface";
import { TransactionManagerInterface } from "@/application/utils/transactionManagerInterface";

export class LoanBookUseCase implements LoanBookUseCaseInterface {
  constructor(
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface,
    private readonly transactionManager: TransactionManagerInterface
  ) {}

  async execute(requestDto: LoanBookRequestDto): Promise<LoanBookResponseDto> {
    return await this.transactionManager.run(async (ctx) => {
      const book = await this.bookRepository.findBookById(
        requestDto.bookId,
        ctx
      );
      if (!book) {
        throw new Error("Book not found");
      }
      book.loanBook();

      const loans = await this.loanRepository.findByUserId(
        requestDto.userId,
        ctx
      );
      if (loans.filter((loan) => loan.returnDate === null).length >= 5) {
        throw new Error("User has reached the maximum number of active loans");
      }
      await this.bookRepository.update(book, ctx);

      const newLoan = new Loan(
        this.idGenerator.generateId(),
        requestDto.bookId,
        requestDto.userId,
        new Date()
      );
      const createdLoan = await this.loanRepository.create(newLoan, ctx);

      return {
        id: createdLoan.id,
        bookId: createdLoan.bookId,
        userId: createdLoan.userId,
        loanDate: createdLoan.loanDate,
        returnDate: createdLoan.returnDate,
        createdAt: createdLoan.createdAt,
        updatedAt: createdLoan.updatedAt,
      };
    });
  }
}
