import { IsString } from "class-validator";
import { ProductForMailDto } from "src/product/dto/product.dto";

export class MailApplicationDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  articul: string | undefined;

  @IsString({ each: true })
  products: ProductForMailDto[];

  @IsString()
  message: string;
}

export class MailPartnersDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  companyName: string;

  @IsString()
  phone: string;

  @IsString()
  message: string;
}

export class MailVacationDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  vacation: string;

  @IsString()
  phone: string;

  @IsString()
  message: string;
}
