// user.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async seedUsers(): Promise<void> {
    /* Need to refine when its need*/

    // const userData = [ ];

    // for (const element of userData) {
    //   const existingUser = await this.userRepo.findOne({
    //     where: { email: element.email },
    //   });
    //   if (!existingUser) {
    //     try {
    //       const userObj = element;
    //       const profileObj = element.profile;
    //       delete userObj.profile;
    //       const userRecord = await admin.auth().createUser({
    //         email: userObj.email,
    //         emailVerified: false,
    //         password: process.env.SUBSCRIBED_USER_PASSWORD,
    //         displayName: userObj.firstName,
    //         disabled: false,
    //       });
    //       userObj['firebaseId'] = userRecord.uid;
    //       const saltRounds = 10;
    //       const hashedPassword = await bcrypt.hash(
    //         process.env.SUBSCRIBED_USER_PASSWORD,
    //         saltRounds,
    //       );
    //       userObj.password = hashedPassword;
    //       await this.userRepo.save(userObj);

    //       if (userObj.firstName !== 'Admin') {
    //         const user: any = await this.userRepo.findOne({
    //           where: { email: userObj.email },
    //           relations: ['profile'],
    //         });
    //         user.profile = profileObj;
    //         await this.userRepo.save(user);
    //       }
    //     } catch (error) {}
    //   }
    // }
  }
}
