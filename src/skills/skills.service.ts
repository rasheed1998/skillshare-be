import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepo: Repository<Skill>,
  ) {}

  create(data: CreateSkillDto) {
    const skill = this.skillRepo.create(data);
    return this.skillRepo.save(skill);
  }

  update(id: number, data: UpdateSkillDto) {
    return this.skillRepo.update(id, data);
  }

  findByProvider(providerId: number) {
    return this.skillRepo.findBy({ providerId });
  }
}
