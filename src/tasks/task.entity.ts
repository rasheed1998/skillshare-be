import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Offer } from '../offers/offer.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column()
  userId: number; // ✅ Enables easy filtering and validation

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  hours: number;

  @Column()
  rate: number;

  @Column()
  currency: string;

  @Column({ default: 'open' })
  status: 'open' | 'in_progress' | 'completed' | 'accepted' | 'rejected';

  @Column({ nullable: true })
  progress?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Category, (category) => category.tasks, { cascade: true })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Offer, (offer) => offer.task)
  offers: Offer[];
}
