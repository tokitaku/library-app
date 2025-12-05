import { LoanBookRequestDto } from '@/application/dtos/loan/loanBookRequestDto';
import { LoanBookResponseDto } from '@/application/dtos/loan/loanBookResponseDto';

export interface LoanBookUseCaseInterface {
  execute(requestDto: LoanBookRequestDto): Promise<LoanBookResponseDto>;
}
