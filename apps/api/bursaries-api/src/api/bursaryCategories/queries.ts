import { db } from "@soco/bursaries-db/index";
import { eq } from "drizzle-orm";
import { type BursaryCategoryId, bursaryCategoryIdSchema, bursaryCategories } from "@soco/bursaries-db/schema/bursaryCategories";

export const getBursaryCategories = async () => {
  const rows = await db.select().from(bursaryCategories);
  const b = rows
  return { bursaryCategories: b };
};

export const getBursaryCategoryById = async (id: BursaryCategoryId) => {
  const { id: bursaryCategoryId } = bursaryCategoryIdSchema.parse({ id });
  const [row] = await db.select().from(bursaryCategories).where(eq(bursaryCategories.id, bursaryCategoryId));
  if (row === undefined) return {};
  const b = row;
  return { bursaryCategory: b };
};


