import { Prisma } from "@prisma/client";

export const returnValueObject: Prisma.ValueSelect = {
  id: true,
  name: true,
  articul: true,
};
