import {
  Controller,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Put,
  Get,
  Body,
  Patch,
  Param,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  @Auth()
  async getProfile(@CurrentUser("id") id: number) {
    return this.userService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put("profile")
  async updateProfile(@CurrentUser("id") id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @Auth()
  @HttpCode(200)
  @Patch("profile/favorites/:productId")
  async toggleFavorite(
    @Param("productId") productId: string,
    @CurrentUser("id") id: number
  ) {
    return this.userService.toggleFavorite(id, +productId);
  }
}
