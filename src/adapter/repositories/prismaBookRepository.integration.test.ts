import { PrismaClient } from "@prisma/client";
import { PrismaBookRepository } from "./prismaBookRepository";
import { Book } from "@/domain/entities/book";

const prisma = new PrismaClient();
const repository = new PrismaBookRepository(prisma);

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  // テスト前にデータをクリーンアップ（外部キー制約のため、Loanを先に削除）
  await prisma.loan.deleteMany();
  await prisma.book.deleteMany();
});

describe("PrismaBookRepository", () => {
  test("should create and retrieve a book", async () => {
    const book = new Book("test-book-id", "Test Book");
    const savedBook = await repository.create(book);

    expect(savedBook).toBeDefined();
    expect(savedBook.id).toBe("test-book-id");
    expect(savedBook.title).toBe("Test Book");
    expect(savedBook.isAvailable).toBe(true);

    const retrievedBook = await repository.findBookById(savedBook.id);
    expect(retrievedBook).toBeDefined();
    expect(retrievedBook?.id).toBe(savedBook.id);
    expect(retrievedBook?.title).toBe(savedBook.title);
  });

  test("should return null when book not found", async () => {
    const result = await repository.findBookById("non-existent-id");
    expect(result).toBeNull();
  });

  test("should update a book", async () => {
    const book = new Book("update-test-id", "Original Title");
    await repository.create(book);

    book.loanBook();
    const updatedBook = await repository.update(book);

    expect(updatedBook.id).toBe("update-test-id");
    expect(updatedBook.isAvailable).toBe(false);

    const retrievedBook = await repository.findBookById("update-test-id");
    expect(retrievedBook?.isAvailable).toBe(false);
  });

  test("should handle multiple books", async () => {
    const book1 = new Book("book-1", "Book One");
    const book2 = new Book("book-2", "Book Two");

    await repository.create(book1);
    await repository.create(book2);

    const retrieved1 = await repository.findBookById("book-1");
    const retrieved2 = await repository.findBookById("book-2");

    expect(retrieved1?.title).toBe("Book One");
    expect(retrieved2?.title).toBe("Book Two");
  });

  test("should preserve timestamps", async () => {
    const customDate = new Date("2023-06-15T10:00:00Z");
    const book = new Book(
      "timestamp-test",
      "Timestamp Book",
      true,
      customDate,
      customDate
    );

    const savedBook = await repository.create(book);

    expect(savedBook.createdAt.getTime()).toBe(customDate.getTime());
    expect(savedBook.updatedAt.getTime()).toBe(customDate.getTime());
  });
});
