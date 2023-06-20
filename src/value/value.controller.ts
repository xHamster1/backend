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
import { ValueDto } from "./value.dto";
import { ValueService } from "./value.service";

@Controller("value")
export class ValueController {
  constructor(private readonly valueService: ValueService) {}

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.valueService.byId(+id);
  }

  @Get("by-specification/:specificationSlug")
  async getProductsByCategory(
    @Param("specificationSlug") specificationId: number
  ) {
    return this.valueService.bySpecification(specificationId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createSpecification(@Body() dto: ValueDto) {
    return this.valueService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async updateProduct(@Param("id") id: string, @Body() dto: ValueDto) {
    return this.valueService.update(+id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    return this.valueService.delete(+id);
  }
}
