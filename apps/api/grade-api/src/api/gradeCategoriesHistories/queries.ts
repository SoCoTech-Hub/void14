import type { GradeCategoriesHistoryId } from "@soco/grade-db/schema/gradeCategoriesHistories";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradeCategoriesHistories,
  gradeCategoriesHistoryIdSchema,
} from "@soco/grade-db/schema/gradeCategoriesHistories";

export const getGradeCategoriesHistories = async () => {
  const rows = await db.select().from(gradeCategoriesHistories);
  const g = rows;
  return { gradeCategoriesHistories: g };
};

export const getGradeCategoriesHistoryById = async (
  id: GradeCategoriesHistoryId,
) => {
  const { id: gradeCategoriesHistoryId } = gradeCategoriesHistoryIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select()
    .from(gradeCategoriesHistories)
    .where(eq(gradeCategoriesHistories.id, gradeCategoriesHistoryId));
  if (row === undefined) return {};
  const g = row;
  return { gradeCategoriesHistory: g };
};
