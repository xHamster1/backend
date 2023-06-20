import { IsNumber, IsString } from "class-validator";

export class SpecificationDto {
  @IsString()
  name: string;

  @IsNumber()
  productId: number;
}
