import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillService: SkillsService) {}

  @Post()
  createSkill(@Body() dto: CreateSkillDto) {
    return this.skillService.create(dto);
  }

  @Put(':id')
  updateSkill(@Param('id') id: string, @Body() dto: UpdateSkillDto) {
    return this.skillService.update(+id, dto);
  }

  @Get('provider/:providerId')
  getSkillsByProvider(@Param('providerId') providerId: string) {
    return this.skillService.findByProvider(+providerId);
  }
}
