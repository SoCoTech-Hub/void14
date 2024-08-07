import type { GradingformRubricFillingId } from "@soco/grade-db/schema/gradingformRubricFillings";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradingformRubricFillingIdSchema,
  gradingformRubricFillings,
} from "@soco/grade-db/schema/gradingformRubricFillings";

export const getGradingformRubricFillings = async () => {
  const rows = await db.select().from(gradingformRubricFillings);
  const g = rows;
  return { gradingformRubricFillings: g };
};

export const getGradingformRubricFillingById = async (
  id: GradingformRubricFillingId,
) => {
  const { id: gradingformRubricFillingId } =
    gradingformRubricFillingIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradingformRubricFillings)
    .where(eq(gradingformRubricFillings.id, gradingformRubricFillingId));
  if (row === undefined) return {};
  const g = row;
  return { gradingformRubricFilling: g };
};
