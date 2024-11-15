

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Messages } from '../constMessages';
import { AuthHelper } from 'src/jwt-auth/auth.helper';

@Injectable()
export class UsersHelper {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly helper: AuthHelper,

  ) {}

  async createNewUser(createUserDto: CreateUserDto) {
    const user = await this.getSingleRecord({ email: createUserDto.email });
    if (user) throw new BadRequestException(Messages.USER_EXIST);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const createdUser= await this.createRecord(createUserDto);
    console.log("createdUser", createdUser)
    const token = this.helper.generateToken(createdUser);
    return {
        message: 'User registered successfully',
        data: {
        token,
          user: createdUser,
        },
      };

  }

  async ValidateUser(email: string, password: string): Promise<any> {
    
      let userData = await this.getSingleRecord([
        { email: email },
      ]);
      if (!userData)
        throw {
          message: Messages.INVALID_CREDENTIALS,
          code: Messages.UNAUTHORIZED,
        };



      if (!(await bcrypt.compare(password, userData.password))) {
        throw new UnauthorizedException(Messages.INVALID_PASSWORD);
    
      }
      const { ...result } = userData;
      return result;
  }

  async UpdateUser(data: any, user: any) {
    try {
      await this.ValidateUserBeforeUpdate(data);
      let updateableJson = await this.GetJsonObject(data);
      return await this.userRepo.save({ ...updateableJson, id: user.id });
    } catch (error) {
      throw { message: error.message, code: error.code };
    }
  }

  async ValidateUserBeforeUpdate(data: any) {
    try {
      let exist: any;
      if (data && data.email) {
        exist = await this.getSingleRecord({ email: data.email });
        if (exist)
          throw {
            message: Messages.USER_EXIST_USERNAME,
            code: Messages.CONFLICT,
          };
      }
      if (data && data.username) {
        exist = await this.getSingleRecord({ username: data.username });
        if (exist)
          throw {
            message: Messages.USER_EXIST_USERNAME,
            code: Messages.CONFLICT,
          };
      }
      return true;
    } catch (error) {
      throw { message: error.message, code: error.code };
    }
  }

  async GetJsonObject(input: JSON) {
    const filtered = Object.fromEntries(
      Object.entries(input).filter(([key, value]) => value !== ''),
    );
    return filtered;
  }

  async getSingleRecord(whereCondition: any) {
    return await this.userRepo.findOne({ where: whereCondition });
  }

  async createRecord(data: any) : Promise<User> {
    const createdData= await this.userRepo.save(data);
    return createdData;
    
  }
}




