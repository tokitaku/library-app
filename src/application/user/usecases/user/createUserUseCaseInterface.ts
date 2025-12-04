import type { CreateUserRequestDto } from "@/application/user/dtos/user/createUserRequestDto";
import { CreateUserResponseDto } from "@/application/user/dtos/user/createUserResponseDto";

export interface CreateUserUseCaseInterface {
  execute(requestDto: CreateUserRequestDto): Promise<CreateUserResponseDto>;
}
