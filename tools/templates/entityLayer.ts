import { capitalize, lowercaseFirst } from "@/tools/utils";

export function generateEntity(name: string) {
  const content = `
export class ${capitalize(name)} {
  constructor(
    private _id: string,
    // Add other properties as needed
  ) {}

  get id(): string {
    return this._id;
  }
}
`;
  return content.trim() + "\n";
}

export function generateRepositoryInterface(name: string) {
  const content = `
import { ${capitalize(name)} } from "../../domain/entities/${lowercaseFirst(
    name
  )}";

export interface ${capitalize(name)}RepositoryInterface {
  create(${lowercaseFirst(name)}: ${capitalize(name)}): Promise<void>;
  findById(id: string): Promise<${capitalize(name)} | null>;
}
  `;

  return content.trim() + "\n";
}
