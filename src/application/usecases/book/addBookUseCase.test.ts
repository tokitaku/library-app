import { AddBookUseCase } from "./addBookUseCase";
import { Book } from "@/domain/entities/book";
import { BookRepositoryInterface } from "@/domain/repositories/bookRepositoryInterface";
import { IdGeneratorInterface } from "@/domain/utils/idGeneratorInterface";
import { AddBookRequestDto } from "@/application/dtos/book/addBookRequestDto";

describe("AddBookUseCase", () => {
  let mockRepository: jest.Mocked<BookRepositoryInterface>;
  let mockIdGenerator: jest.Mocked<IdGeneratorInterface>;
  let useCase: AddBookUseCase;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findBookById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    mockIdGenerator = {
      generateId: jest.fn(),
    };

    useCase = new AddBookUseCase(mockRepository, mockIdGenerator);
  });

  test("should add a book correctly", async () => {
    const mockBook = new Book("test-id", "Test Book");
    mockIdGenerator.generateId.mockReturnValue("test-id");
    mockRepository.create.mockResolvedValue(mockBook);

    const requestDto: AddBookRequestDto = { title: "Test Book" };
    const result = await useCase.execute(requestDto);

    expect(result.id).toBe("test-id");
    expect(result.title).toBe("Test Book");
    expect(result.isAvailable).toBe(true);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
    expect(mockRepository.create).toHaveBeenCalledWith(expect.any(Book));
    expect(mockIdGenerator.generateId).toHaveBeenCalled();
  });

  test("should handle repository errors", async () => {
    mockIdGenerator.generateId.mockReturnValue("test-id");
    mockRepository.create.mockRejectedValue(new Error("Database error"));

    const requestDto: AddBookRequestDto = { title: "Test Book" };

    await expect(useCase.execute(requestDto)).rejects.toThrow("Database error");
    expect(mockIdGenerator.generateId).toHaveBeenCalled();
  });

  test("should generate unique ID for each book", async () => {
    const mockBook1 = new Book("id-1", "Book 1");
    const mockBook2 = new Book("id-2", "Book 2");

    mockIdGenerator.generateId
      .mockReturnValueOnce("id-1")
      .mockReturnValueOnce("id-2");

    mockRepository.create
      .mockResolvedValueOnce(mockBook1)
      .mockResolvedValueOnce(mockBook2);

    const result1 = await useCase.execute({ title: "Book 1" });
    const result2 = await useCase.execute({ title: "Book 2" });

    expect(result1.id).toBe("id-1");
    expect(result2.id).toBe("id-2");
    expect(mockIdGenerator.generateId).toHaveBeenCalledTimes(2);
  });
});
