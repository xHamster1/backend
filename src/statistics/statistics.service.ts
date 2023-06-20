import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async getMain(userId: number) {
    const user = await this.userService.byId(userId, {
      orders: {
        select: {
          items: true,
        },
      },
    });

    const totalAmount = await this.prisma.order.aggregate({
      where: {
        userId,
      },
      _sum: {},
    });

    // return [
    //   {
    //     name: "Orders",
    //     value: user.orders.length,
    //   },
    //   {
    //     name: "Favorites",
    //     value: user.favorites.length,
    //   },
    // ];
  }
}
