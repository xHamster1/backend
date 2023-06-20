import { Prisma } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { BrandDto } from "src/brand/brand.dto";
import { CategoryDto } from "src/category/category.dto";
import { SpecificationDto } from "src/specification/specification.dto";
import { SubcategoryDto } from "src/subcategory/subcategory.dto";
import { ValueDto } from "src/value/value.dto";

export class ProductDto implements Prisma.ProductUpdateInput {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsString({ each: true })
  // @ArrayMinSize(1)
  images: string[];

  @IsNumber()
  categoryId: number;

  @IsNumber()
  brandId: number;

  @IsNumber()
  subcategoryId: number;
}

export class ProductForMailDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsString({ each: true })
  // @ArrayMinSize(1)
  images: string[];

  category: CategoryDto;

  brand: BrandDto;

  subcategory: SubcategoryDto;
}
