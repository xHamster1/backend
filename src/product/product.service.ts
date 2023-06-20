import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PaginationService } from "src/pagination/pagination.service";
import { PrismaService } from "src/prisma.service";
import { generateSlug } from "src/utils/generate-slug";
import { EnumProductSort, GetAllProductDto } from "./dto/get-all.product.dto";
import { ProductDto } from "./dto/product.dto";
import {
  productReturnObject,
  productReturnObjectFullest,
} from "./return-product.object";

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async getAll(dto: GetAllProductDto = {}) {
    const { sort, searchTerm } = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductSort.LOW_PRICE) prismaSort.push({ price: "asc" });
    else if (sort === EnumProductSort.HIGH_PRICE)
      prismaSort.push({ price: "desc" });
    else if (sort === EnumProductSort.OLDEST)
      prismaSort.push({ createdAt: "asc" });
    else prismaSort.push({ createdAt: "desc" });

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const { perPage, skip } = this.paginationService.getPagination(dto);

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: productReturnObject,
    });

    return {
      products,
      length: await this.prisma.product.count({
        where: prismaSearchTermFilter,
      }),
    };
  }

  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: productReturnObjectFullest,
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug,
      },
      select: productReturnObjectFullest,
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return product;
  }

  async byCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: productReturnObjectFullest,
    });

    if (!products) throw new NotFoundException("Products not found");
    return products;
  }

  async byBrand(brandSlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        brand: {
          slug: brandSlug,
        },
      },
      select: productReturnObjectFullest,
    });

    if (!products) throw new NotFoundException("Products not found");
    return products;
  }

  async bySubcategory(subcategorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        subcategory: {
          slug: subcategorySlug,
        },
      },
      select: productReturnObjectFullest,
    });

    if (!products) throw new NotFoundException("Products not found");
    return products;
  }

  async getSimilar(id: number) {
    const currentProduct = await this.byId(id);

    if (!currentProduct)
      throw new NotFoundException("Current product not found");

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name,
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: productReturnObject,
    });
    return products;
  }

  async create() {
    const product = await this.prisma.product.create({
      data: {
        description: "",
        name: "",
        price: 0,
        slug: "",
      },
    });

    return product.id;
  }

  async update(id: number, dto: ProductDto) {
    const {
      description,
      images,
      price,
      name,
      categoryId,
      brandId,
      subcategoryId,
    } = dto;

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        description,
        images,
        price,
        name,
        slug: generateSlug(name),
        category: {
          connect: {
            id: categoryId,
          },
        },
        brand: {
          connect: {
            id: brandId,
          },
        },
        subcategory: {
          connect: {
            id: subcategoryId,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
