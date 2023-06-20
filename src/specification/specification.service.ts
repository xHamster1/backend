import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { generateSlug } from "src/utils/generate-slug";
import { returnSpecificationObject } from "./return-specification.object";
import { SpecificationDto } from "./specification.dto";

@Injectable()
export class SpecificationService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.specifications.findMany({
      select: returnSpecificationObject,
    });
  }

  async byId(id: number) {
    const specification = await this.prisma.specifications.findUnique({
      where: {
        id,
      },
      select: returnSpecificationObject,
    });

    if (!specification) {
      throw new Error("Product not found");
    }

    return specification;
  }

  async byProduct(productSlug: string) {
    const specifications = await this.prisma.specifications.findMany({
      where: {
        product: {
          slug: productSlug,
        },
      },
      select: returnSpecificationObject,
    });

    if (!specifications) {
      throw new NotFoundException("Specifications not found");
    }

    return specifications;
  }

  async create(dto: SpecificationDto) {
    return this.prisma.specifications.create({
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        productId: dto.productId,
      },
    });
  }

  async update(id: number, dto: SpecificationDto) {
    const { name, productId } = dto;

    return this.prisma.specifications.update({
      where: {
        id,
      },
      data: {
        name,
        slug: generateSlug(name),
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.specifications.delete({
      where: {
        id,
      },
    });
  }
}
