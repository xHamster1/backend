import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ValueController } from "./value.controller";
import { ValueService } from "./value.service";

@Module({
  controllers: [ValueController],
  providers: [ValueService, PrismaService],
})
export class ValueModule {}
