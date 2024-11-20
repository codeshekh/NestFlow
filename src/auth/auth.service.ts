import { Injectable,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';

import * as crypto from 'crypto';


@Injectable()
export class AuthService{
private otpStore: Map<string,string> = new Map();

  constructor(private readonly userService: UsersService,
  private readonly mailSerivce: MailService,
  private readonly jwtService: JwtService,
  ){}

async sendOtp(email:string): Promise<void>{
  const user = await this.userService.getUserByEmail(email);
  if(!user){
    throw new UnauthorizedException('User not found');
  }
  const otp = crypto.randomInt(100000,999999).toString();
  this.otpStore.set(email,otp);

  setTimeout(() => this.otpStore.delete(email),300000);
  await this.mailSerivce.sendOtp(email,otp);
}

async verifyOtp(email: string, otp: string): Promise<string | null>{
  const storedOtp = this.otpStore.get(email);
  if(storedOtp !==otp){
    return null;

  }
  const payload = {email};
  return this.jwtService.sign(payload);
}


}