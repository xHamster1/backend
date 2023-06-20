import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { generateSlug } from "src/utils/generate-slug";
import { BrandDto } from "./brand.dto";
import { returnBrandObject } from "./return-brand.object";

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    const brand = await this.prisma.brand.findUnique({
      where: {
        id,
      },
      select: returnBrandObject,
    });

    if (!brand) {
      throw new Error("Brand not found");
    }

    return brand;
  }

  async bySlug(slug: string) {
    const brand = await this.prisma.brand.findUnique({
      where: {
        slug,
      },
      select: returnBrandObject,
    });

    if (!brand) {
      throw new NotFoundException("Brand not found");
    }

    return brand;
  }

  async getAll() {
    return this.prisma.brand.findMany({
      select: returnBrandObject,
    });
  }

  async create() {
    return this.prisma.brand.create({
      data: {
        name: "",
        slug: "",
        description: "",
        logo: "",
        link: "",
      },
    });
  }

  async update(id: number, dto: BrandDto) {
    return this.prisma.brand.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        description: dto.description,
        logo: dto.logo,
        link: dto.link,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.brand.delete({
      where: {
        id,
      },
    });
  }
}
