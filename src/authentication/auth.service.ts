import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './interfaces/token-payload';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { ErrorCodes } from '../database/enums/error-codes.enum';
import { ConfigTokens } from '../config/config-tokens.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerData: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create({
        ...registerData,
      });
    } catch (error) {
      console.log('error');
      if (error?.code === ErrorCodes.UniqueViolation) {
        throw new BadRequestException(
          `User with id ${registerData.id} already exists`,
        );
      }
    }
  }

  async getAccessToken(id: number): Promise<string> {
    const payload: TokenPayload = { id };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(`${ConfigTokens.JWT}.secret`),
    });
  }
}
