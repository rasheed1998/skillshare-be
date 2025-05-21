import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(+id, dto);
  }

  @Put(':id/progress')
  updateProgress(
    @Param('id') id: string,
    @Body() body: { progressUpdate: string },
  ) {
    return this.tasksService.updateProgress(+id, body.progressUpdate);
  }

  @Put(':id/complete')
  markComplete(@Param('id') id: string) {
    return this.tasksService.markComplete(+id);
  }

  @Get('user/:userId')
  getByUser(@Param('userId') userId: string) {
    return this.tasksService.findByUser(+userId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.tasksService.findById(+id);
  }

  @Put(':id/review-completion')
  reviewCompletion(
    @Param('id') id: string,
    @Body() body: { status: 'accepted' | 'rejected' },
  ) {
    return this.tasksService.reviewCompletion(+id, body.status);
  }
}
