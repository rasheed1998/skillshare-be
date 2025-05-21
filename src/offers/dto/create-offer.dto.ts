import { IsNumber } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  providerId: number;

  @IsNumber()
  taskId: number;

  @IsNumber()
  proposedRate: number;
}
