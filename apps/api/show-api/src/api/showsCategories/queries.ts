import type { ShowsCategoryId } from "@soco/show-db/schema/showsCategories";
import { eq } from "@soco/show-db";
import { db } from "@soco/show-db/client";
import {
  showsCategories,
  showsCategoryIdSchema,
} from "@soco/show-db/schema/showsCategories";

export const getShowsCategories = async () => {
  const rows = await db.select().from(showsCategories);
  const s = rows;
  return { showsCategories: s };
};

export const getShowsCategoryById = async (id: ShowsCategoryId) => {
  const { id: showsCategoryId } = showsCategoryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(showsCategories)
    .where(eq(showsCategories.id, showsCategoryId));
  if (row === undefined) return {};
  const s = row;
  return { showsCategory: s };
};
