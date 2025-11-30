import { BookService } from "@/businessLogic/bookService";
import type { Book } from "@prisma/client";
import type { BookRepositoryInterface } from "@/dataAccess/bookRepositoryInterface";

const mockBookRepository: jest.Mocked<BookRepositoryInterface> = {
  create: jest.fn(),
  findById: jest.fn(),
};

describe("BookService", () => {
  let bookService: BookService;

  beforeEach(() => {
    bookService = new BookService(mockBookRepository);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("書籍の登録が成功する", async () => {
    const newBook: Book = {
      id: "1",
      title: "Test Book",
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockBookRepository.create.mockResolvedValue(newBook);

    const result = await bookService.addBook("Test Book");

    expect(result).toEqual(newBook);
    expect(mockBookRepository.create).toHaveBeenCalledWith("Test Book");
  });
});
