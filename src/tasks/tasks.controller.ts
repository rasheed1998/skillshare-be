import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // === Only User ===

  @Post()
  @Roles('user')
  create(@Request() req, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto, req.user.id);
  }

  @Put(':id')
  @Roles('user')
  update(@Param('id') id: string, @Request() req, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(+id, dto, req.user.id);
  }

  @Put(':id/complete')
  @Roles('user')
  markComplete(@Param('id') id: string, @Request() req) {
    return this.tasksService.markComplete(+id, req.user.id);
  }

  @Put(':id/review-completion')
  @Roles('user')
  reviewCompletion(
    @Param('id') id: string,
    @Body() body: { status: 'accepted' | 'rejected' },
    @Request() req,
  ) {
    return this.tasksService.reviewCompletion(+id, body.status, req.user.id);
  }

  @Get()
  @Roles('user')
  getByUser(@Request() req) {
    return this.tasksService.findByUser(req.user.id);
  }

  // === Only Provider ===

  @Put(':id/progress')
  @Roles('provider')
  updateProgress(
    @Param('id') id: string,
    @Body() body: { progressUpdate: string },
    @Request() req,
  ) {
    return this.tasksService.updateProgress(
      +id,
      body.progressUpdate,
      req.user.id,
    );
  }

  @Get('provider')
  @Roles('provider')
  getByProvider(@Request() req) {
    return this.tasksService.findAcceptedTasksByProvider(req.user.id);
  }

  // === Shared ===

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.tasksService.findById(+id);
  }
}
