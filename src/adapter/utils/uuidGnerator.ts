import { IdGeneratorInterface } from "@/domain/utils/idGeneratorInterface";
import { v4 as uudidv4 } from "uuid";

export class UuidGenerator implements IdGeneratorInterface {
  generateId(): string {
    return uudidv4();
  }
}
