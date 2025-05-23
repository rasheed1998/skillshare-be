import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  providerId: number;

  @Column()
  taskId: number;

  @Column()
  status: 'pending' | 'accepted' | 'rejected';

  @ManyToOne(() => Task, (task) => task.offers, { eager: true })
  task: Task;
}
