import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import User from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { TelegramGuard } from './guards/telegram.guard';
import { LoginDto } from './dtos/login.dto';
import { UserExistGuard } from './guards/user-exist.guard';

@Controller('auth')
@UseGuards(TelegramGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerData: CreateUserDto): Promise<User> {
    return await this.authService.register(registerData);
  }

  @Post('/login')
  @UseGuards(UserExistGuard)
  async login(@Body() loginBody: LoginDto): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.getAccessToken(loginBody.id);
    return { accessToken };
  }
}
