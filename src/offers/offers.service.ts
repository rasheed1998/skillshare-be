import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOfferDto } from './dto/update-offer-status.dto';
import { Offer } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Task } from '../tasks/task.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepo: Repository<Offer>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(data: CreateOfferDto) {
    const offer = this.offerRepo.create({
      ...data,
      status: 'pending',
    });
    return this.offerRepo.save(offer);
  }

  async update(id: number, dto: UpdateOfferDto, userId: number) {
    const offer = await this.offerRepo.findOne({
      where: { id },
      relations: ['task'],
    });

    if (!offer) throw new NotFoundException('Offer not found');

    // Ensure that only the task creator can accept/reject
    if (offer.task.userId !== userId) {
      throw new ForbiddenException('You cannot update this offer');
    }

    offer.status = dto.status;
    return this.offerRepo.save(offer);
  }

  async findByTask(taskId: number, userId: number) {
    const task = await this.taskRepo.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId) {
      throw new ForbiddenException('Unauthorized');
    }
    return this.offerRepo.find({ where: { taskId } });
  }

  async findByProvider(providerId: number) {
    return this.offerRepo.find({ where: { providerId } });
  }
}
