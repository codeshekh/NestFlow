import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dtos/create.users.dtos";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from "./dto/login.dto";

@ApiTags('auth') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
@ApiOperation({ summary: 'User login' })
@ApiBody({ type: LoginDto, description: 'User login credentials' })
@ApiResponse({ status: 200, description: 'User successfully logged in', schema: { example: { access_token: 'JWT_TOKEN' } } })
@ApiResponse({ status: 401, description: 'Unauthorized' })
async login(@Body() loginDto: LoginDto) {
  const user = await this.authService.validateUser(loginDto.email, loginDto.password);

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return this.authService.login(user);
}
}
