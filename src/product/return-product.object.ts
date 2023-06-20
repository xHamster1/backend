import { Prisma } from "@prisma/client";
import { returnBrandObject } from "src/brand/return-brand.object";
import { returnCategoryObject } from "src/category/return-category.object";
import { returnSpecificationObject } from "src/specification/return-specification.object";
import { returnSubcategoryObject } from "src/subcategory/return-subcategory.objects";

export const productReturnObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  id: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true,
  brand: {
    select: returnBrandObject,
  },
  category: {
    select: returnCategoryObject,
  },
  subcategory: {
    select: returnSubcategoryObject,
  },
  specifications: {
    select: returnSpecificationObject,
  },
};

export const productReturnObjectFullest: Prisma.ProductSelect = {
  ...productReturnObject,
};
