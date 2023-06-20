import { IsOptional, IsString } from "class-validator";

export class BrandDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  logo: string;

  @IsString()
  link: string;
}
