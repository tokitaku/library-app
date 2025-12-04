import { User } from "@/domain/entities/user";

export interface UserRepositoryInterface {
  create(user: User): Promise<User>;
}
