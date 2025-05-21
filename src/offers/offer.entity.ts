import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  providerId: number;

  @Column()
  taskId: number;

  @Column()
  proposedRate: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';
}
