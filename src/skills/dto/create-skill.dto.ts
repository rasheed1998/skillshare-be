import { IsString, IsNumber, IsIn, IsArray } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  experience: string;

  @IsIn(['online', 'onsite'])
  nature: 'online' | 'onsite';

  @IsNumber()
  hourlyRate: number;

  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[];
}
