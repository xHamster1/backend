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
import { SpecificationDto } from "./specification.dto";
import { SpecificationService } from "./specification.service";

@Controller("specification")
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {}

  @Get()
  async getAll() {
    return this.specificationService.getAll();
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.specificationService.byId(+id);
  }

  @Get("by-product/:productSlug")
  async getSpecificationsByProduct(@Param("productSlug") productSlug: string) {
    return this.specificationService.byProduct(productSlug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createSpecification(@Body() dto: SpecificationDto) {
    return this.specificationService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async updateProduct(@Param("id") id: string, @Body() dto: SpecificationDto) {
    return this.specificationService.update(+id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    return this.specificationService.delete(+id);
  }
}
