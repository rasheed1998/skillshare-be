import {
  IsString,
  IsDateString,
  IsNumber,
  IsIn,
  IsArray,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  startDate: Date;

  @IsNumber()
  hours: number;

  @IsNumber()
  rate: number;

  @IsIn(['USD', 'AUD', 'SGD', 'INR'])
  currency: 'USD' | 'AUD' | 'SGD' | 'INR';

  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[];
}
