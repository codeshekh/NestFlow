// src/auth/dto/verify-otp.dto.ts
import { IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  email: string;

  @IsString()
  otp: string;
}
