import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOfferDto } from './dto/update-offer-status.dto';
import { Offer } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepo: Repository<Offer>,
  ) {}

  create(data: CreateOfferDto) {
    const offer = this.offerRepo.create(data);
    return this.offerRepo.save(offer);
  }

  update(id: number, dto: UpdateOfferDto) {
    return this.offerRepo.update(id, dto);
  }

  findByTask(taskId: number) {
    return this.offerRepo.findBy({ taskId });
  }

  findByProvider(providerId: number) {
    return this.offerRepo.findBy({ providerId });
  }
}
