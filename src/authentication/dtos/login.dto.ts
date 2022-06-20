import { IsNotEmpty, IsNumber } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
