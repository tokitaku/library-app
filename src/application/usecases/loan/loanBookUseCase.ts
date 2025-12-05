import { LoanRepositoryInterface } from "@/domain/repositories/loanRepositoryInterface";
import { Loan } from "@/domain/entities/loan";
import { LoanBookRequestDto } from "@/application/dtos/loan/loanBookRequestDto";
import { LoanBookResponseDto } from "@/application/dtos/loan/loanBookResponseDto";
import { LoanBookUseCaseInterface } from "@/application/usecases/loan/loanBookUseCaseInterface";
import { BookRepositoryInterface } from "@/domain/repositories/bookRepositoryInterface";
import { IdGeneratorInterface } from "@/domain/utils/idGeneratorInterface";

export class LoanBookUseCase implements LoanBookUseCaseInterface {
  constructor(
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface
  ) {}

  async execute(requestDto: LoanBookRequestDto): Promise<LoanBookResponseDto> {
    const book = await this.bookRepository.findBookById(requestDto.bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    book.loanBook();

    const loans = await this.loanRepository.findByUserId(requestDto.userId);
    if (loans.filter((loan) => loan.returnDate === null).length >= 5) {
      throw new Error("User has reached the maximum number of active loans");
    }
    await this.bookRepository.update(book);

    const newLoan = new Loan(
      this.idGenerator.generateId(),
      requestDto.bookId,
      requestDto.userId,
      new Date()
    );
    const createdLoan = await this.loanRepository.create(newLoan);

    return {
      id: createdLoan.id,
      bookId: createdLoan.bookId,
      userId: createdLoan.userId,
      loanDate: createdLoan.loanDate,
      returnDate: createdLoan.returnDate,
      createdAt: createdLoan.createdAt,
      updatedAt: createdLoan.updatedAt,
    };
  }
}
