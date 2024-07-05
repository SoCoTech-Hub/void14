import { eq } from "drizzle-orm";

import type { ApplicationCategoryId } from "../../db/schema/applicationCategories";
import { db } from "../../db/index";
import {
  applicationCategories,
  applicationCategoryIdSchema,
} from "../../db/schema/applicationCategories";

export const getApplicationCategories = async () => {
  const rows = await db.select().from(applicationCategories);
  const a = rows;
  return { applicationCategories: a };
};

export const getApplicationCategoryById = async (id: ApplicationCategoryId) => {
  const { id: applicationCategoryId } = applicationCategoryIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(applicationCategories)
    .where(eq(applicationCategories.id, applicationCategoryId));
  if (row === undefined) return {};
  const a = row;
  return { applicationCategory: a };
};
