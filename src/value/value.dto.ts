import { IsNumber, IsString } from "class-validator";

export class ValueDto {
  @IsString()
  name: string;

  @IsString()
  articul: string;

  @IsNumber()
  specificationId: number;
}
