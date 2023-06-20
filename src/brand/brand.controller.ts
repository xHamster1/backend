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
import { BrandDto } from "./brand.dto";
import { BrandService } from "./brand.service";

@Controller("brand")
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get("by-slug/:slug")
  async getBySlug(@Param("slug") slug: string) {
    return this.brandService.bySlug(slug);
  }

  @Get(":id")
  @Auth()
  async getById(@Param("id") id: string) {
    return this.brandService.byId(+id);
  }

  @Get()
  async getAll() {
    return this.brandService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: BrandDto) {
    return this.brandService.update(+id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async create() {
    return this.brandService.create();
  }

  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.brandService.delete(+id);
  }
}
