import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { GetAllProductDto } from "./dto/get-all.product.dto";
import { ProductDto } from "./dto/product.dto";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto);
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.productService.byId(+id);
  }

  @Get("similar/:id")
  async getSimilar(@Param("id") id: string) {
    return this.productService.getSimilar(+id);
  }

  @Get("by-slug/:slug")
  async getProductBySlug(@Param("slug") slug: string) {
    return this.productService.bySlug(slug);
  }

  @Get("by-category/:categorySlug")
  async getProductsByCategory(@Param("categorySlug") categorySlug: string) {
    return this.productService.byCategory(categorySlug);
  }

  @Get("by-subcategory/:subcategorySlug")
  async getProductsBySubcategory(
    @Param("subcategorySlug") subcategorySlug: string
  ) {
    return this.productService.bySubcategory(subcategorySlug);
  }

  @Get("by-brand/:brandSlug")
  async getProductsByBrand(@Param("brandSlug") brandSlug: string) {
    return this.productService.byBrand(brandSlug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createProduct() {
    return this.productService.create();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async updateProduct(@Param("id") id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    return this.productService.delete(+id);
  }
}
