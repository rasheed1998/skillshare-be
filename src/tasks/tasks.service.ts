import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  create(data: CreateTaskDto) {
    const task = this.taskRepo.create(data);
    return this.taskRepo.save(task);
  }

  update(id: number, dto: UpdateTaskDto) {
    return this.taskRepo.update(id, dto);
  }

  async updateProgress(id: number, progressUpdate: string) {
    return this.taskRepo.update(id, {
      progressUpdate,
      progressTimestamp: new Date(),
    });
  }

  markComplete(id: number) {
    return this.taskRepo.update(id, { status: 'completed' });
  }

  findByUser(userId: number) {
    return this.taskRepo.findBy({ userId });
  }

  findById(id: number) {
    return this.taskRepo.findOneBy({ id });
  }

  reviewCompletion(id: number, status: 'accepted' | 'rejected') {
    return this.taskRepo.update(id, { status });
  }
}
