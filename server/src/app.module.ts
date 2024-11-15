import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/typeorm.config';
import { DatabaseConfig } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { UserSeeder } from './database/user.seeder';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Destination folder for uploaded files
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({ imports: [ConfigModule], useClass: DatabaseConfig }),
    UsersModule,
    ScheduleModule.forRoot(),
    JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, UserSeeder],
})
export class AppModule {
  constructor(private readonly userSeeder: UserSeeder) { }

  configure(consumer: MiddlewareConsumer) {
    // Apply middleware with global configuration to all other routes
    consumer.apply(json({ limit: '50mb' }), urlencoded({ limit: '50mb', extended: true }))
  }
  async onModuleInit() {
    await this.userSeeder.seedUsers();
  }
}
