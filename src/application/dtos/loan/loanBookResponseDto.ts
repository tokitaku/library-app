export interface LoanBookResponseDto {
  id: string;
  bookId: string;
  userId: string;
  loanDate: Date;
  returnDate: Date | null;
  createdAt: Date;
  updatedAt: Date;

}