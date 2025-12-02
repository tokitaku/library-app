import path from "path";
import { writeFile, lowercaseFirst } from "@/tools/utils";
import {
  generateEntity,
  generateRepositoryInterface,
} from "@/tools/templates/entityLayter";
import { input, select } from "@inquirer/prompts";

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
    console.log("UseCase");
  } else if (layer === "Interface adapter") {
    console.log("Interface adapter");
  } else if (layer === "Framework & Driver") {
    console.log("Framework & Driver");
  }
}

main();
