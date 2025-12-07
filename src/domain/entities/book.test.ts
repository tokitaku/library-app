import { Book } from "./book";

describe("Book Entity", () => {
  test("should create a book with id and title", () => {
    const book = new Book("test-id", "The Great Gatsby");
    expect(book.id).toBe("test-id");
    expect(book.title).toBe("The Great Gatsby");
    expect(book.isAvailable).toBe(true);
  });

  test("should have default createdAt and updatedAt", () => {
    const book = new Book("test-id", "1984");
    expect(book.createdAt).toBeInstanceOf(Date);
    expect(book.updatedAt).toBeInstanceOf(Date);
  });

  test("should loan and return a book", () => {
    const book = new Book("test-id", "1984");
    expect(book.isAvailable).toBe(true);

    book.loanBook();
    expect(book.isAvailable).toBe(false);

    book.returnBook();
    expect(book.isAvailable).toBe(true);
  });

  test("should throw error when loaning an already loaned book", () => {
    const book = new Book("test-id", "Brave New World");
    book.loanBook();

    expect(() => book.loanBook()).toThrow("この本はすでに貸し出されています");
  });

  test("should throw error when returning a book that is not loaned", () => {
    const book = new Book("test-id", "Fahrenheit 451");

    expect(() => book.returnBook()).toThrow("この本は貸し出されていません");
  });

  test("should create a book with custom dates", () => {
    const customDate = new Date("2023-01-01");
    const book = new Book(
      "test-id",
      "Custom Book",
      true,
      customDate,
      customDate
    );

    expect(book.createdAt).toEqual(customDate);
    expect(book.updatedAt).toEqual(customDate);
  });
});
