import { IsEmail, isEmail, IsOptional, IsString } from "class-validator";
export class UserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  passwrod?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatarPath: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
