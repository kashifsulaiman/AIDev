import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { error as ERROR } from './constants';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {

  @ApiProperty({
    description: 'The email or username of the user. This should be a unique identifier for the user.',
    example: 'ajlalkhan',
    type: String,
    minLength: 7,
    maxLength: 50
  })
  @IsNotEmpty()
  @IsEmail({},{message:'Invalid email address. Please provide a valid email.'})
  @Transform(({ value }) => value.trim())
  email: string;


  @ApiProperty({
    description: 'The password of the user. This should be a unique identifier for the user.',
    example: 'ajlalkhan7890',
    type: String,
    minLength: 7,
    maxLength: 50
  })
  @IsString({ message: ERROR.PASSWORD_REQUIRED })
  @IsNotEmpty({ message: ERROR.PASSWORD_REQUIRED })
  @Transform(({ value }) => value.trim())
  password: string;
}
