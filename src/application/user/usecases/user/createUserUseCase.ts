import { UserRepositoryInterface } from "@/domain/repositories/userRepositoryInterface";
import { User } from "@/domain/entities/user";
import { CreateUserRequestDto } from "@/application/user/dtos/user/createUserRequestDto";
import { CreateUserResponseDto } from "@/application/user/dtos/user/createUserResponseDto";
import { CreateUserUseCaseInterface } from "./createUserUseCaseInterface";
import { IdGeneratorInterface } from "@/domain/utils/idGeneratorInterface";

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface
  ) {}

  async execute(
    requestDto: CreateUserRequestDto
  ): Promise<CreateUserResponseDto> {
    const id = this.idGenerator.generateId();
    const newUser = new User(id, requestDto.email);
    const createdUser = await this.userRepository.create(newUser);

    return {
      id: createdUser.id,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
  }
}
