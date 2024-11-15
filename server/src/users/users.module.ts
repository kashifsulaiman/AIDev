import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthHelper } from 'src/jwt-auth/auth.helper';
import { JwtStrategy } from 'src/jwt-auth/auth.strategy';
import { UsersHelper } from 'src/utils/users/user.helper';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtStrategy,
    AuthHelper,
    UsersHelper
  ],
})
export class UsersModule {

}
