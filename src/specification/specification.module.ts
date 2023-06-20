import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SpecificationController } from "./specification.controller";
import { SpecificationService } from "./specification.service";

@Module({
  controllers: [SpecificationController],
  providers: [SpecificationService, PrismaService],
})
export class SpecificationModule {}
