import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const body: LoginDto = context.switchToHttp().getRequest().body;

    return this.validateUser(body.id);
  }

  async validateUser(id: number): Promise<boolean> {
    return !!(await this.usersService.findOne(id));
  }
}
