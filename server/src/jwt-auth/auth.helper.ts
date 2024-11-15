import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  private readonly jwt: JwtService;
  private readonly secretKey: any = process.env.JWT_SECRET;
  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return this.repository.findOne({ where: { email: decoded.email } });
  }

  // Generate JWT Token
  public generateToken(user: User): any {
    return this.jwt.sign(user);
  }

  public generateAdminToken(email: string): any {
    return this.jwt.sign({ email }, { expiresIn: '86400s' });
  }

  public generateResetPasswordToken(email: string) {
    return this.jwt.sign({ email }, { expiresIn: 8 * 60 });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }
  verifyToken(token: string): { isValid: boolean; payload?: any } {
    try {
      const decoded = this.jwt.verify(token, this.secretKey);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        return { isValid: false, payload: null };
      }

      return { isValid: true, payload: decoded };
    } catch (error) {
      return { isValid: false, payload: null };
    }
  }
}
