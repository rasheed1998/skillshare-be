import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Category } from '../categories/category.entity';
import { Offer } from '../offers/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Category, Offer])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
