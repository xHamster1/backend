import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { SubcategoryDto } from "./subcategory.dto";
import { SubcategoryService } from "./subcategory.service";

@Controller("subcategory")
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get("by-slug/:slug")
  async getBySlug(@Param("slug") slug: string) {
    return this.subcategoryService.bySlug(slug);
  }

  @Get(":id")
  @Auth()
  async getById(@Param("id") id: string) {
    return this.subcategoryService.byId(+id);
  }

  @Get()
  async getAll() {
    return this.subcategoryService.getAll();
  }

  @Get("by-category/:categorySlug")
  async getSubcategoryByCategory(@Param("categorySlug") categorySlug: string) {
    return this.subcategoryService.byCategory(categorySlug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: SubcategoryDto) {
    return this.subcategoryService.update(+id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async create() {
    return this.subcategoryService.create();
  }

  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.subcategoryService.delete(+id);
  }
}
