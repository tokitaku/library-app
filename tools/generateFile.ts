import path from "path";
import { writeFile, lowercaseFirst } from "@/tools/utils";
import {
  generateEntity,
  generateRepositoryInterface,
} from "@/tools/templates/entityLayer";
import { input, select } from "@inquirer/prompts";
import {
  generateRequestDto,
  generateResponseDto,
  generateUseCase,
  generateUseCaseInterface,
} from "@/tools/templates/useCaseLayer";

async function generateEntityLayer() {
  const entityName = await input({
    message: "エンティティの名前を入力してください:",
  });

  const basePath = path.join(process.cwd(), "src", "domain");

  const entityContent = generateEntity(entityName);
  writeFile(
    path.join(basePath, "entities", `${lowercaseFirst(entityName)}.ts`),
    entityContent
  );

  const repositoryInterfaceContent = generateRepositoryInterface(entityName);
  writeFile(
    path.join(
      basePath,
      "repositories",
      `${lowercaseFirst(entityName)}RepositoryInterface.ts`
    ),
    repositoryInterfaceContent
  );
}

async function generateUseCaseLayer() {
  const entityName = await input({
    message: "エンティティの名前を入力してください:",
  });

  const useCaseName = await input({
    message: "ユースケースの名前を入力してください:",
  });

  const basePath = path.join(process.cwd(), "src", "application", entityName);

  const requestDtoContent = generateRequestDto(useCaseName);
  writeFile(
    path.join(
      basePath,
      "dtos",
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}RequestDto.ts`
    ),
    requestDtoContent
  );

  const responseDtoContent = generateResponseDto(useCaseName);
  writeFile(
    path.join(
      basePath,
      "dtos",
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}ResponseDto.ts`
    ),
    responseDtoContent
  );

  const UseCaseInterfaceContent = generateUseCaseInterface(
    entityName,
    useCaseName
  );
  writeFile(
    path.join(
      basePath,
      "usecases",
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}UseCaseInterface.ts`
    ),
    UseCaseInterfaceContent
  );

  const useCaseContent = generateUseCase(entityName, useCaseName);
  writeFile(
    path.join(
      basePath,
      "usecases",
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}UseCase.ts`
    ),
    useCaseContent
  );
}
async function main() {
  const layers = [
    "Entity",
    "UseCase",
    "Interface adapter",
    "Framework & Driver",
  ] as const;

  type Layer = (typeof layers)[number];

  const layer = await select<Layer>({
    message: "どの層にファイルを生成しますか?",
    choices: layers.map((l) => ({ name: l, value: l })),
  });

  if (layer === "Entity") {
    await generateEntityLayer();
  } else if (layer === "UseCase") {
    await generateUseCaseLayer();
  } else if (layer === "Interface adapter") {
    console.log("Interface adapter");
  } else if (layer === "Framework & Driver") {
    console.log("Framework & Driver");
  }
}

main();
