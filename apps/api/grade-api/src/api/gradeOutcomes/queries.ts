import type { GradeOutcomeId } from "@soco/grade-db/schema/gradeOutcomes";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradeOutcomeIdSchema,
  gradeOutcomes,
} from "@soco/grade-db/schema/gradeOutcomes";

export const getGradeOutcomes = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(gradeOutcomes)
    .where(eq(gradeOutcomes.userId, session?.user.id!));
  const g = rows;
  return { gradeOutcomes: g };
};

export const getGradeOutcomeById = async (id: GradeOutcomeId) => {
  const { session } = await getUserAuth();
  const { id: gradeOutcomeId } = gradeOutcomeIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradeOutcomes)
    .where(
      and(
        eq(gradeOutcomes.id, gradeOutcomeId),
        eq(gradeOutcomes.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const g = row;
  return { gradeOutcome: g };
};
