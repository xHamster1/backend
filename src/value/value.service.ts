import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { returnValueObject } from "./return-value.object";
import { ValueDto } from "./value.dto";

@Injectable()
export class ValueService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    const value = await this.prisma.value.findUnique({
      where: {
        id,
      },
      select: returnValueObject,
    });

    if (!value) {
      throw new Error("Product not found");
    }

    return value;
  }

  async bySpecification(specificationId: number) {
    const values = await this.prisma.value.findMany({
      where: {
        specificationsId: +specificationId,
      },
      select: returnValueObject,
    });

    if (!values) {
      throw new NotFoundException("Values not found");
    }

    return values;
  }

  async create(dto: ValueDto) {
    return this.prisma.value.create({
      data: {
        name: dto.name,
        articul: dto.articul,
        specificationsId: dto.specificationId,
      },
    });
  }

  async update(id: number, dto: ValueDto) {
    return this.prisma.value.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        articul: dto.articul,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.value.delete({
      where: {
        id,
      },
    });
  }
}
