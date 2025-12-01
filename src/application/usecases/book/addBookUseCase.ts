import { AddBookRequestDto } from "@/application/dtos/book/addBookRequestDto";
import { AddBookResponseDto } from "@/application/dtos/book/addBookResponsDto";
import { AddBookUseCaseInterface } from "@/application/usecases/book/addBookUseCaseInterface";
import { Book } from "@/domain/entities/book";
import { BookRepositoryInterface } from "@/domain/repositories/bookRepositoryInterface";
import { IdGeneratorInterface } from "@/domain/utils/idGeneratorInterface";

export class AddBookUseCase implements AddBookUseCaseInterface {
  constructor(
    private readonly bookRepository: BookRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface
  ) {}
  async execute(requestDto: AddBookRequestDto): Promise<AddBookResponseDto> {
    const id = this.idGenerator.generateId();
    const newbook = new Book(id, requestDto.title);

    const createdBook = await this.bookRepository.create(newbook);

    return {
      id: createdBook.id,
      title: createdBook.title,
      isAvailable: createdBook.isAvailable,
      createdAt: createdBook.createdAt,
      updatedAt: createdBook.updatedAt,
    };
  }
}
