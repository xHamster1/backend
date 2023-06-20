import { Prisma } from "@prisma/client";

export const returnBrandObject: Prisma.BrandSelect = {
  id: true,
  name: true,
  slug: true,
  logo: true,
  link: true,
  description: true,
};
