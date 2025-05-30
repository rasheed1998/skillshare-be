import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { Task } from '../tasks/task.entity'; // ✅ Import Task entity
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Task])], // ✅ Register Task
  providers: [OffersService],
  controllers: [OffersController],
})
export class OffersModule {}
