import { Prisma } from "@prisma/client";
import { returnSubcategoryObject } from "src/subcategory/return-subcategory.objects";

export const returnCategoryObject: Prisma.CategorySelect = {
  id: true,
  name: true,
  slug: true,
  subcategory: {
    select: returnSubcategoryObject,
  },
};
