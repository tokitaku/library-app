import inquirer from "inquirer";

async function main() {
  const layers = [
    "Entity",
    "UseCase",
    "Interface adapter",
    "Framework & Driver",
  ] as const;

  type Layer = (typeof layers)[number];

  const { layer }: { layer: Layer } = await inquirer.prompt([
    {
      type: "list",
      name: "layer",
      message: "どの層にファイルを生成しますか?",
      choices: layers,
    },
  ]);

  console.log(`Selected layer: ${layer}, Feature name: ${featureName}`);

  if (layer === "Entity") {
    console.log("Entity");
  } else if (layer === "UseCase") {
    console.log("UseCase");
  } else if (layer === "Interface adapter") {
    console.log("Interface adapter");
  } else if (layer === "Framework & Driver") {
    console.log("Framework & Driver");
  }
}

main();
