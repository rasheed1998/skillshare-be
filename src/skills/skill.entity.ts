import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  providerId: number;

  @Column()
  experience: string;

  @Column()
  nature: 'online' | 'onsite';

  @Column()
  hourlyRate: number;

  @ManyToMany(() => Category, (category) => category.skills, { cascade: true })
  @JoinTable()
  categories: Category[];
}
