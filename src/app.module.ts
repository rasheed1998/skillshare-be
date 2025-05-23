import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from './offers/offers.module';
import { SkillsModule } from './skills/skills.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'skillshare',
      autoLoadEntities: true,
      synchronize: true, // ❗For dev only, disable in production

      // ✅ Connection Pooling
      extra: {
        max: 10, // maximum number of connections in the pool
        idleTimeoutMillis: 30000, // close idle clients after 30s
        connectionTimeoutMillis: 2000, // throw error if no connection in 2s
      },
    }),
    UsersModule,
    SkillsModule,
    TasksModule,
    OffersModule,
    AuthModule,
    CategoryModule,
  ],
})
export class AppModule {}
