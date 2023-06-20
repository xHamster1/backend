import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { generateSlug } from "src/utils/generate-slug";
import { returnSubcategoryObject } from "./return-subcategory.objects";
import { SubcategoryDto } from "./subcategory.dto";

@Injectable()
export class SubcategoryService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: {
        id,
      },
      select: returnSubcategoryObject,
    });

    if (!subcategory) {
      throw new Error("Subcategory not found");
    }

    return subcategory;
  }

  async bySlug(slug: string) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: {
        slug,
      },
      select: returnSubcategoryObject,
    });

    if (!subcategory) {
      throw new NotFoundException("Category not found");
    }

    return subcategory;
  }

  async getAll() {
    return this.prisma.subcategory.findMany({
      select: returnSubcategoryObject,
    });
  }

  async byCategory(categorySlug) {
    const subcategory = await this.prisma.subcategory.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: returnSubcategoryObject,
    });

    if (!subcategory) throw new NotFoundException("Products not found");
    return subcategory;
  }

  async create() {
    return this.prisma.subcategory.create({
      data: {
        name: "",
        slug: "",
      },
    });
  }

  async update(id: number, dto: SubcategoryDto) {
    return this.prisma.subcategory.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        categoryId: dto.categoryId,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.subcategory.delete({
      where: {
        id,
      },
    });
  }
}
