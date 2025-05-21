import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  category: string;

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

  @Column({ default: 'posted' })
  status: 'posted' | 'in_progress' | 'completed' | 'accepted' | 'rejected';

  @Column({ nullable: true })
  progressUpdate?: string;

  @Column({ nullable: true })
  progressTimestamp?: Date;
}
