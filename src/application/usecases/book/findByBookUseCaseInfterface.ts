import { FindBookByIdRequestDto } from "@/application/dtos/book/findBookByIdRequestDto";
import { FindBookByIdResponseDto } from "@/application/dtos/book/findBookByIdResponseDto";

export interface FindBookByIdUseCaseInterface {
  execute(
    requestDto: FindBookByIdRequestDto
  ): Promise<FindBookByIdResponseDto | null>;
}
