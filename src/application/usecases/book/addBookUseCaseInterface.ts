import { AddBookRequestDto } from "@/application/dtos/book/addBookRequestDto";
import { AddBookResponseDto } from "@/application/dtos/book/addBookResponsDto";

export interface AddBookUseCaseInterface {
  execute(requestDto: AddBookRequestDto): Promise<AddBookResponseDto>;
}
