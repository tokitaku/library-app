import { AddBookRequestDto } from "@/application/dtos/book/addBookRequestDto";
import { AddBookUseCaseInterface } from "@/application/usecases/book/addBookUseCaseInterface";

export class BookCommand {
  constructor(private readonly addBookUseCase: AddBookUseCaseInterface) {}

  async addBook(title: string) {
    try {
      const requestDto: AddBookRequestDto = { title };
      const book = await this.addBookUseCase.execute(requestDto);
      console.log("Book added:", book);
    } catch (error) {
      console.log("Error adding book:", error);
    }
  }
}
