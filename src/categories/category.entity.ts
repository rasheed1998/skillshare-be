import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Skill } from 'src/skills/skill.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Skill, (skill) => skill.categories)
  skills: Skill[];

  @ManyToMany(() => Task, (task) => task.categories)
  tasks: Task[];
}
