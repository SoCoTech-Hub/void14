import type { GradeGradesHistoryId } from "@soco/grade-db/schema/gradeGradesHistories";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradeGradesHistories,
  gradeGradesHistoryIdSchema,
} from "@soco/grade-db/schema/gradeGradesHistories";

export const getGradeGradesHistories = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(gradeGradesHistories)
    .where(eq(gradeGradesHistories.userId, session?.user.id!));
  const g = rows;
  return { gradeGradesHistories: g };
};

export const getGradeGradesHistoryById = async (id: GradeGradesHistoryId) => {
  const { session } = await getUserAuth();
  const { id: gradeGradesHistoryId } = gradeGradesHistoryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradeGradesHistories)
    .where(
      and(
        eq(gradeGradesHistories.id, gradeGradesHistoryId),
        eq(gradeGradesHistories.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const g = row;
  return { gradeGradesHistory: g };
};
