import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from './user.types';
import { USER_ROLES_VALUES } from './user.constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([USER_ROLES_VALUES])
  readonly role: UserRole;
}
