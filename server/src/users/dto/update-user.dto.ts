import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {

  @ApiProperty({
    description: 'The username of the user. This should be a unique identifier for the user.',
    example: 'sample',
    type: String
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'The username of the user. This should be a unique identifier for the user.',
    example: 'sample@gmail.com',
    type: String
  })
  @IsString()
  @IsOptional()
  email?: string;

}
