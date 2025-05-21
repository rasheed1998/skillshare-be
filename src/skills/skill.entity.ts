import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  providerId: number;

  @Column()
  category: string;

  @Column()
  experience: string;

  @Column()
  nature: 'onsite' | 'online';

  @Column()
  hourlyRate: number;
}
