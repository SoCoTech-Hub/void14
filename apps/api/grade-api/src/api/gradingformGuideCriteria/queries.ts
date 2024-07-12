import type { GradingformGuideCriterionId } from "@soco/grade-db/schema/gradingformGuideCriteria";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradingformGuideCriteria,
  gradingformGuideCriterionIdSchema,
} from "@soco/grade-db/schema/gradingformGuideCriteria";

export const getGradingformGuideCriteria = async () => {
  const rows = await db.select().from(gradingformGuideCriteria);
  const g = rows;
  return { gradingformGuideCriteria: g };
};

export const getGradingformGuideCriterionById = async (
  id: GradingformGuideCriterionId,
) => {
  const { id: gradingformGuideCriterionId } =
    gradingformGuideCriterionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradingformGuideCriteria)
    .where(eq(gradingformGuideCriteria.id, gradingformGuideCriterionId));
  if (row === undefined) return {};
  const g = row;
  return { gradingformGuideCriterion: g };
};
