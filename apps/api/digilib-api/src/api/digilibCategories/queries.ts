import { db } from "@soco/digilib-db/index";
import { eq } from "drizzle-orm";
import { type DigilibCategoryId, digilibCategoryIdSchema, digilibCategories } from "@soco/digilib-db/schema/digilibCategories";

export const getDigilibCategories = async () => {
  const rows = await db.select().from(digilibCategories);
  const d = rows
  return { digilibCategories: d };
};

export const getDigilibCategoryById = async (id: DigilibCategoryId) => {
  const { id: digilibCategoryId } = digilibCategoryIdSchema.parse({ id });
  const [row] = await db.select().from(digilibCategories).where(eq(digilibCategories.id, digilibCategoryId));
  if (row === undefined) return {};
  const d = row;
  return { digilibCategory: d };
};


