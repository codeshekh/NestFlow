import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{
  constructor(private readonly userService: UsersService,
    private readonly jwtService : JwtService
  ){}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      console.log('User found:', user);
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    }
    console.log('Invalid credentials');
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    console.log('Payload:', payload);  // Debug log
    const access_token = this.jwtService.sign(payload);
    console.log('JWT Token:', access_token);  // Debug log
    return { access_token };
  }
}