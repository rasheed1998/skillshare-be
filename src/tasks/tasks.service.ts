import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Offer } from '../offers/offer.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateTaskDto, userId: number) {
    const categories = await this.categoryRepo.find({
      where: { id: In(dto.categoryIds) },
    });

    const task = this.taskRepo.create({
      ...dto,
      user: { id: userId },
      categories,
    });

    return this.taskRepo.save(task);
  }

  async update(id: number, dto: UpdateTaskDto, userId: number) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user', 'categories'],
    });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== userId)
      throw new ForbiddenException('You can only update your own task');

    if (dto.categoryIds) {
      const categories = await this.categoryRepo.find({
        where: { id: In(dto.categoryIds) },
      });
      task.categories = categories;
    }

    Object.assign(task, dto);
    return this.taskRepo.save(task);
  }

  async updateProgress(id: number, progressUpdate: string, providerId: number) {
    const offer = await this.offerRepo.findOne({
      where: { providerId, status: 'accepted' },
      relations: ['task'],
    });

    if (!offer || offer.task.id !== id) {
      throw new ForbiddenException('You are not authorized to update progress for this task');
    }

    const task = offer.task;
    task.progress = progressUpdate;
    task.status = 'in_progress';

    return this.taskRepo.save(task);
  }

  async markComplete(id: number, userId: number) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== userId)
      throw new ForbiddenException('Only the task owner can mark it complete');

    task.status = 'completed';
    return this.taskRepo.save(task);
  }

  async reviewCompletion(
    id: number,
    status: 'accepted' | 'rejected',
    userId: number,
  ) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== userId)
      throw new ForbiddenException('Only the task owner can review completion');

    task.status = status;
    return this.taskRepo.save(task);
  }

  async findByUser(userId: number) {
    return this.taskRepo.find({
      where: { user: { id: userId } },
      relations: ['categories'],
    });
  }

  async findAcceptedTasksByProvider(providerId: number) {
    const offers = await this.offerRepo.find({
      where: { providerId, status: 'accepted' },
      relations: ['task'],
    });
    return offers.map((offer) => offer.task);
  }

  async findById(id: number) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
