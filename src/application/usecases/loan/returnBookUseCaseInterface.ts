import { ReturnBookRequestDto } from '@/application/loan/dtos/loan/returnBookRequestDto';
import { ReturnBookResponseDto } from '@/application/loan/dtos/loan/returnBookResponseDto';

export interface ReturnBookUseCaseInterface {
  execute(requestDto: ReturnBookRequestDto): Promise<ReturnBookResponseDto>;
}
