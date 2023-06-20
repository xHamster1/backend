import { Prisma } from "@prisma/client";
import { returnValueObject } from "src/value/return-value.object";

export const returnSpecificationObject: Prisma.SpecificationsSelect = {
  id: true,
  name: true,
  slug: true,
  value: {
    select: returnValueObject,
  },
  productId: true,
};
