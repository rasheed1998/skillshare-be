import { IsString, IsNumber, IsIn } from 'class-validator';

export class CreateSkillDto {
  @IsNumber()
  providerId: number;

  @IsString()
  category: string;

  @IsString()
  experience: string;

  @IsIn(['onsite', 'online'])
  nature: 'onsite' | 'online';

  @IsNumber()
  hourlyRate: number;
}
