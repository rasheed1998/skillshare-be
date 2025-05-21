import { IsIn } from 'class-validator';

export class UpdateOfferDto {
  @IsIn(['accepted', 'rejected'])
  status: 'accepted' | 'rejected';
}
