import { IsNumber, IsString } from "class-validator";

export class SubcategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;
}
