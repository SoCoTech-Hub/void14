import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ShowsCategoryId, showsCategoryIdSchema, showsCategories } from "@/lib/db/schema/showsCategories";

export const getShowsCategories = async () => {
  const rows = await db.select().from(showsCategories);
  const s = rows
  return { showsCategories: s };
};

export const getShowsCategoryById = async (id: ShowsCategoryId) => {
  const { id: showsCategoryId } = showsCategoryIdSchema.parse({ id });
  const [row] = await db.select().from(showsCategories).where(eq(showsCategories.id, showsCategoryId));
  if (row === undefined) return {};
  const s = row;
  return { showsCategory: s };
};


