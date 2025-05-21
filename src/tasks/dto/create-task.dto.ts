import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  userId: number;

  @IsString()
  category: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  startDate: string;

  @IsNumber()
  hours: number;

  @IsNumber()
  rate: number;

  @IsString()
  currency: 'USD' | 'AUD' | 'SGD' | 'INR';
}
