import { User } from "../../domain/entities/user";

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}
