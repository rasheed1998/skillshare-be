import { IsString } from 'class-validator';

export class ProgressUpdateDto {
  @IsString()
  progressUpdate: string;
}
