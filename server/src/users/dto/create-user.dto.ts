import {
  IsEmail,
  IsNotEmpty,
  IsString,
   MinLength,
} from 'class-validator';
import { error as ERROR } from './constants';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {


  @ApiProperty({
    description: 'The email of the user. This should be a unique identifier for the user.',
    example: 'john_doe@gmail.com',
    type: String,
    minLength: 7,
    maxLength: 50
  })
  @IsNotEmpty({ message: ERROR.EMAIL })
  @IsEmail({},{message:'Invalid email address. Please provide a valid email.'})
  email: string;


  @ApiProperty({
    description: 'The password of the user. This should be a unique identifier for the user.',
    example: '**********',
    type: String,
    minLength: 7,
    maxLength: 50
  })
  @IsString({ message: ERROR.PASSWORD_REQUIRED })
  @IsNotEmpty({ message: ERROR.PASSWORD_REQUIRED })
  @MinLength(8, { message: ERROR.PASSWORD_MIN_LENGTH })
  password: string;

  @ApiProperty({
    description: 'The password of the user. This should be a unique identifier for the user.',
    example: '**********',
    type: String,
    minLength: 7,
    maxLength: 50
  })
  confirmPassword: string;

}

export class CreateGuestUserDto {
  @IsString()
  @IsNotEmpty()
  appId: string;
}
