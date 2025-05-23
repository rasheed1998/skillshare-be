import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @Roles('provider')
  create(@Body() dto: CreateSkillDto, @Request() req) {
    return this.skillsService.create(dto, req.user.id);
  }

  @Put(':id')
  @Roles('provider')
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto, @Request() req) {
    return this.skillsService.update(+id, dto, req.user.id);
  }

  @Get('me')
  @Roles('provider')
  findMySkills(@Request() req) {
    return this.skillsService.findByProvider(req.user.id);
  }
}
