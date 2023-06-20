import { Prisma } from "@prisma/client";
import { returnCategoryObject } from "src/category/return-category.object";
import { productReturnObject } from "src/product/return-product.object";

export const returnSubcategoryObject: Prisma.SubcategorySelect = {
  id: true,
  name: true,
  slug: true,
  category: {
    select: returnCategoryObject,
  },
  products: {
    select: productReturnObject,
  },
};
