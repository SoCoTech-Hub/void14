import { eq } from "drizzle-orm";

import type { CustomFieldCategoryId } from "../db/schema/customFieldCategories";
import { db } from "../db/index";
import {
  customFieldCategories,
  customFieldCategoryIdSchema,
} from "../db/schema/customFieldCategories";

export const getCustomFieldCategories = async () => {
  const rows = await db.select().from(customFieldCategories);
  const c = rows;
  return { customFieldCategories: c };
};

export const getCustomFieldCategoryById = async (id: CustomFieldCategoryId) => {
  const { id: customFieldCategoryId } = customFieldCategoryIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(customFieldCategories)
    .where(eq(customFieldCategories.id, customFieldCategoryId));
  if (row === undefined) return {};
  const c = row;
  return { customFieldCategory: c };
};
