import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsIn,
  IsArray,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsNumber()
  hours?: number;

  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsOptional()
  @IsIn(['USD', 'AUD', 'SGD', 'INR'])
  currency?: 'USD' | 'AUD' | 'SGD' | 'INR';

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds?: number[];
}
