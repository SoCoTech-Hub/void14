import type { GradingformRubricLevelId } from "@soco/grade-db/schema/gradingformRubricLevels";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradingformRubricLevelIdSchema,
  gradingformRubricLevels,
} from "@soco/grade-db/schema/gradingformRubricLevels";

export const getGradingformRubricLevels = async () => {
  const rows = await db.select().from(gradingformRubricLevels);
  const g = rows;
  return { gradingformRubricLevels: g };
};

export const getGradingformRubricLevelById = async (
  id: GradingformRubricLevelId,
) => {
  const { id: gradingformRubricLevelId } = gradingformRubricLevelIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select()
    .from(gradingformRubricLevels)
    .where(eq(gradingformRubricLevels.id, gradingformRubricLevelId));
  if (row === undefined) return {};
  const g = row;
  return { gradingformRubricLevel: g };
};
