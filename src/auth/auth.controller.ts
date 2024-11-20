import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SendOtpDto } from "./dto/send-otp.dtos";
import { VerifyOtpDto } from "./dto/verify-otp.dtos";

@ApiTags('auth')  
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Send OTP to the registered email' }) 
  @ApiBody({ type: SendOtpDto,
    examples: {
      'valid email': {
        value: { email: 'testuser@example.com' },
        description: 'A valid email address to which OTP will be sent.',
      },
      'invalid email': {
        value: { email: 'invalidemail' },
        description: 'An invalid email format.',
      }
    }
   }) 
  @ApiResponse({ status: 200, description: 'OTP sent successfully.' })  
  @ApiResponse({ status: 400, description: 'Invalid email format or other errors.' })  
  @Post('send-otp')
  async sendOtp(@Body() sendotpdto: SendOtpDto): Promise<void> {
    const { email } = sendotpdto;
    await this.authService.sendOtp(email);
  }

  @ApiOperation({ summary: 'Verify OTP for login' })  
  @ApiBody({type: VerifyOtpDto,
    examples: {
      'valid verification': {
        value: { email: 'thepandeyop@gmail.com', otp: 'your-otp' },
        description: 'A valid email and OTP pair for verification.',
      },
      'invalid verification': {
        value: { email: 'invalidemail@example.com', otp: '000000' },
        description: 'An invalid email and OTP pair.',
      }
    }
  })  
  @ApiResponse({ status: 200, description: 'JWT token returned after successful verification.', 
                 schema: { example: { accessToken: 'your-jwt-token' } } })  
  @ApiResponse({ status: 401, description: 'Invalid OTP or Email.' }) 
  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string): Promise<{ accessToken: string }> {
    const token = await this.authService.verifyOtp(email, otp);

    if (!token) {
      throw new UnauthorizedException('Invalid Otp or Email');
    }
    return { accessToken: token };
  }
}
