import { BookCommand } from "@/adapter/commands/bookCommand";
import { PrismaBookRepository } from "@/adapter/repositories/prismaBookRepository";
import { UuidGenerator } from "@/adapter/utils/uuidGnerator";
import { AddBookUseCase } from "@/application/usecases/book/addBookUseCase";
import { PrismaClient } from "@prisma/client";
import { select, input } from "@inquirer/prompts";

const COMMANDS = {
  ADD: { value: "add", name: "書籍の登録" },
  SEARCH: { value: "search", name: "書籍の検索" },
  LIST: { value: "list", name: "書籍の一覧表示" },
} as const;

async function main() {
  const prisma = new PrismaClient();
  const uuidGenerator = new UuidGenerator();
  const bookRepository = new PrismaBookRepository(prisma);
  const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
  const bookCommand = new BookCommand(addBookUseCase);

  const command = await select({
    message: "どのコマンドを実行しますか?",
    choices: Object.values(COMMANDS),
  });

  switch (command) {
    case COMMANDS.ADD.value:
      const title = await input({
        message: "書籍のタイトルを入力してください:",
      });
      await bookCommand.addBook(title);
      break;
    case COMMANDS.SEARCH.value:
      // 検索処理
      break;
    case COMMANDS.LIST.value:
      // 一覧表示処理
      break;
  }
}

main();
