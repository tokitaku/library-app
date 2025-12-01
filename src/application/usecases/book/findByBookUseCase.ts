import { FindBookByIdRequestDto } from "@/application/dtos/book/findBookByIdRequestDto";
import { FindBookByIdResponseDto } from "@/application/dtos/book/findBookByIdResponseDto";
import { FindBookByIdUseCaseInterface } from "@/application/usecases/book/findByBookUseCaseInfterface";
import { BookRepositoryInterface } from "@/domain/repositories/bookRepositoryInterface";

export class FindByBookUseCase implements FindBookByIdUseCaseInterface {
  constructor(private readonly bookRepository: BookRepositoryInterface) {}

  async execute(
    requestDto: FindBookByIdRequestDto
  ): Promise<FindBookByIdResponseDto | null> {
    const foundBook = await this.bookRepository.findBookById(requestDto.id);
    if (!foundBook) {
      return null;
    }

    return {
      id: foundBook.id,
      title: foundBook.title,
      isAvailable: foundBook.isAvailable,
      createdAt: foundBook.createdAt,
      updatedAt: foundBook.updatedAt,
    };
  }
}
