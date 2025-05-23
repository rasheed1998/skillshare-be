import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Skill } from './skill.entity';
import { Category } from '../categories/category.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateSkillDto, providerId: number) {
    const categories = await this.categoryRepo.find({
      where: { id: In(dto.categoryIds) },
    });

    const skill = this.skillRepo.create({
      ...dto,
      providerId,
      categories,
    });

    return this.skillRepo.save(skill);
  }

  async update(id: number, dto: UpdateSkillDto, providerId: number) {
    const skill = await this.skillRepo.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!skill) throw new NotFoundException('Skill not found');
    if (skill.providerId !== providerId) {
      throw new ForbiddenException('Unauthorized');
    }

    const updatedCategories = dto.categoryIds
      ? await this.categoryRepo.find({ where: { id: In(dto.categoryIds) } })
      : skill.categories;

    Object.assign(skill, { ...dto, categories: updatedCategories });

    return this.skillRepo.save(skill);
  }

  async findByProvider(providerId: number) {
    return this.skillRepo.find({
      where: { providerId },
      relations: ['categories'],
    });
  }
}
