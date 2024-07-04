import { eq } from "drizzle-orm";

import type { BursaryCategoryId } from "../db/schema/bursaryCategories";
import { db } from "../db/index";
import {
  bursaryCategories,
  bursaryCategoryIdSchema,
} from "../db/schema/bursaryCategories";

export const getBursaryCategories = async () => {
  const rows = await db.select().from(bursaryCategories);
  const b = rows;
  return { bursaryCategories: b };
};

export const getBursaryCategoryById = async (id: BursaryCategoryId) => {
  const { id: bursaryCategoryId } = bursaryCategoryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(bursaryCategories)
    .where(eq(bursaryCategories.id, bursaryCategoryId));
  if (row === undefined) return {};
  const b = row;
  return { bursaryCategory: b };
};
